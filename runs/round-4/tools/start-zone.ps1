param([long]$TokenCap = 8000000)
# Starts the token-capped proxy and two backends on one evaluation database (angi_eval_zone):
#   before = E:\ANGI-Agent-Eval\build\v31 (c75f9b6, same source as HEAD ca69ec5)   port 5231
#   after  = working tree with the zone fix (scratchpad build-after)             port 5232
# The OpenAI key and Mapbox token are read from angi-backend user secrets into this process only, never printed or written.
$ErrorActionPreference = 'Stop'
$S = 'E:\Temp\claude\21e96ad8b17246bb\2580c7a7-8043-43c1-9238-805348b8cab6\scratchpad\zone-eval'
$R = 'E:\ANGI-Agent-Eval'
$kv = @{}
Get-Content "$R\.secrets.env" | ForEach-Object { if ($_ -match '^([A-Z_]+)=(.*)$') { $kv[$matches[1]] = $matches[2].Trim('"', "'") } }
$csproj = [xml](Get-Content 'E:\CapStone\angi-backend\ANGI.WebApi\ANGI.WebApi.csproj')
$secretsId = $csproj.Project.PropertyGroup.UserSecretsId | Where-Object { $_ } | Select-Object -First 1
$sec = Get-Content "$env:APPDATA\Microsoft\UserSecrets\$secretsId\secrets.json" -Raw -Encoding UTF8 | ConvertFrom-Json
if (-not $sec.'Ai:ApiKey' -or -not $sec.'Mapbox:AccessToken') { throw 'Ai:ApiKey or Mapbox:AccessToken missing from user secrets' }

$env:EVAL_MODE = 'live'; $env:EVAL_ALLOW_PAID = 'yes'; $env:EVAL_TOKEN_CAP = "$TokenCap"; $env:EVAL_CALLS = "$S\calls.jsonl"; $env:PROXY_PORT = '18130'
$pids = @()
$pids += (Start-Process node -ArgumentList "$S\proxy-zone.mjs" -WindowStyle Hidden -PassThru -RedirectStandardOutput "$S\proxy.out" -RedirectStandardError "$S\proxy.err").Id
$ports = @{ before = 5231; after = 5232 }
$dirs = @{ before = "$R\build\v31"; after = "$S\build-after" }
foreach ($v in @('before', 'after')) {
  $port = $ports[$v]; $dir = $dirs[$v]
  New-Item -ItemType Directory -Force "$S\trace-$v" | Out-Null
  $e = [ordered]@{
    ASPNETCORE_ENVIRONMENT = 'Development'; ASPNETCORE_URLS = "http://127.0.0.1:$port"; APPDATA = "$R\empty-appdata"
    ConnectionStrings__Default = "Host=127.0.0.1;Port=55432;Database=angi_eval_zone;Username=angi_backend;Password=$($kv.PG_BACKEND)"
    Jwt__SecretKey = $kv.JWT_KEY; Recommendation__BaseUrl = 'http://127.0.0.1:18120/'; Recommendation__ApiKey = $kv.RECO_KEY
    Ai__BaseUrl = "http://127.0.0.1:18130/run/$v/v1/"; Ai__ApiKey = $sec.'Ai:ApiKey'; Ai__Model = 'gpt-6-luna'
    Agent__MessagesPerMinute = '1000'; Agent__MessagesPerDay = '100000'; Agent__ReasoningEffort = 'none'
    RateLimit__GeneralPermitLimit = '100000'; RateLimit__ReadPermitLimit = '100000'; RateLimit__LoginPermitLimit = '1000'
    Brevo__BaseUrl = 'http://127.0.0.1:9/'; Brevo__ApiKey = 'disabled'
    Mapbox__BaseUrl = 'https://api.mapbox.com/'; Mapbox__AccessToken = $sec.'Mapbox:AccessToken'
    AgentTrace__Enabled = 'true'; AgentTrace__Directory = "$S\trace-$v"
    Google__ClientId = 'disabled'; Cloudinary__CloudName = 'disabled'; Cloudinary__ApiKey = 'disabled'; Cloudinary__ApiSecret = 'disabled'
  }
  foreach ($k in $e.Keys) { Set-Item "env:$k" $e[$k] }
  $pids += (Start-Process "$dir\ANGI.WebApi.exe" -WorkingDirectory $dir -WindowStyle Hidden -PassThru -RedirectStandardOutput "$S\backend-$v.out" -RedirectStandardError "$S\backend-$v.err").Id
}
Remove-Item Env:Ai__ApiKey, Env:Mapbox__AccessToken, Env:EVAL_ALLOW_PAID -ErrorAction SilentlyContinue
$sec = $null
$pids -join ',' | Set-Content "$S\pids.txt"
foreach ($port in 5231, 5232) {
  $end = (Get-Date).AddSeconds(120); $ok = $false
  while (-not $ok -and (Get-Date) -lt $end) { try { $ok = (Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:$port/health" -TimeoutSec 3).StatusCode -lt 500 } catch { if ($_.Exception.Response) { $ok = $true } else { Start-Sleep 2 } } }
  "port $port healthy=$ok"
}
"pids=$($pids -join ',')"
