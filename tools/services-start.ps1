param([Parameter(Mandatory)][string]$RunId, [string]$Mode='dry', [long]$TokenCap=0, [string[]]$Versions=@('v11','v20','v30'), [string]$Build='', [string]$Models='')
# -Build v40 runs every slot on build\v40; -Models 'v30=openai/gpt-6-luna;v31=...' sets Ai__Model per slot (default gpt-6-luna).
$model=@{}; foreach($p in ($Models -split ';' | Where-Object { $_ })){ $kv=$p -split '=',2; $model[$kv[0].Trim()]=$kv[1].Trim() }
# Starts the proxy and the three backends from E:\ANGI-Agent-Eval only.
# APPDATA points at an empty folder, so the developer's user secrets are never loaded.
$R='E:\ANGI-Agent-Eval'
$run="$R\runs\$RunId"
New-Item -ItemType Directory -Force $run | Out-Null
$s=@{}
Get-Content "$R\.secrets.env" | ForEach-Object { if($_ -match '^([A-Z_]+)=(.*)$'){ $s[$matches[1]]=$matches[2].Trim('"',"'") } }
$env:EVAL_MODE=$Mode
$env:EVAL_CALLS="$run\calls.jsonl"
$env:EVAL_TOKEN_CAP="$TokenCap"
$pids=@()
if($Mode -eq 'dry'){
  $pids+=(Start-Process node -ArgumentList "$R\tools\fake-openai.mjs" -WindowStyle Hidden -PassThru -RedirectStandardOutput "$run\fake.out" -RedirectStandardError "$run\fake.err").Id
  $apiKey='fake-key'
} else {
  if($env:EVAL_ALLOW_PAID -ne 'yes' -or -not $env:EVAL_OPENAI_KEY -or $TokenCap -le 0){ throw 'Live run needs EVAL_ALLOW_PAID=yes, EVAL_OPENAI_KEY and -TokenCap' }
  $apiKey=$env:EVAL_OPENAI_KEY
}
$pids+=(Start-Process node -ArgumentList "$R\tools\proxy.mjs" -WindowStyle Hidden -PassThru -RedirectStandardOutput "$run\proxy.out" -RedirectStandardError "$run\proxy.err").Id
$slot=@{ v11=1; v20=2; v30=3; v31=4; v40=5 }
# Place search: the real Mapbox when EVAL_MAPBOX_TOKEN is set (the area scenarios name streets and zones), otherwise disabled.
$mapboxUrl = if ($env:EVAL_MAPBOX_TOKEN) { 'https://api.mapbox.com/' } else { 'http://127.0.0.1:9/' }
$mapboxToken = if ($env:EVAL_MAPBOX_TOKEN) { $env:EVAL_MAPBOX_TOKEN } else { 'disabled' }
foreach($v in $Versions){
  $i=$slot[$v]
  $e=[ordered]@{
    ASPNETCORE_ENVIRONMENT='Development'
    ASPNETCORE_URLS="http://127.0.0.1:520$i"
    APPDATA="$R\empty-appdata"
    ConnectionStrings__Default="Host=127.0.0.1;Port=55432;Database=angi_eval_$v;Username=angi_backend;Password=$($s.PG_BACKEND)"
    Jwt__SecretKey=$s.JWT_KEY
    Recommendation__BaseUrl="http://127.0.0.1:1811$i/"
    Recommendation__ApiKey=$s.RECO_KEY
    Ai__BaseUrl="http://127.0.0.1:18100/run/$v/v1/"
    Ai__ApiKey=$apiKey
    Ai__Model=$(if($model[$v]){ $model[$v] } else { 'gpt-6-luna' })
    Agent__MessagesPerMinute='1000'
    Agent__MessagesPerDay='100000'
    Agent__ReasoningEffort='none'
    RateLimit__GeneralPermitLimit='100000'
    RateLimit__ReadPermitLimit='100000'
    RateLimit__LoginPermitLimit='1000'
    Brevo__BaseUrl='http://127.0.0.1:9/'
    Brevo__ApiKey='disabled'
    Mapbox__BaseUrl=$mapboxUrl
    Mapbox__AccessToken=$mapboxToken
    Google__ClientId='disabled'
    Cloudinary__CloudName='disabled'
    Cloudinary__ApiKey='disabled'
    Cloudinary__ApiSecret='disabled'
  }
  foreach($k in $e.Keys){ Set-Item "env:$k" $e[$k] }
  $b=$(if($Build){ $Build } else { $v })
  $pids+=(Start-Process "$R\build\$b\ANGI.WebApi.exe" -WorkingDirectory "$R\build\$b" -WindowStyle Hidden -PassThru -RedirectStandardOutput "$run\backend-$v.out" -RedirectStandardError "$run\backend-$v.err").Id
}
$pids -join ',' | Set-Content "$run\pids.txt"
"started pids=$($pids -join ',')"
