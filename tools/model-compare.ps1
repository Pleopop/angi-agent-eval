<#
Compares models on the same Agent code (build\v40 = V4.0) and the same scenarios, through OpenRouter.

  E:\ANGI-Agent-Eval\tools\model-compare.ps1 -RunId models-1 -Repeats 3
  E:\ANGI-Agent-Eval\tools\model-compare.ps1 -RunId models-try -Only edit-add-dish -Yes

Slots v30, v31 and v40 only provide the database, reco container and port of each model; all three run build\v40.
(v11 and v20 are avoided because their databases lose tag types for the old versions.)
The OpenRouter key is read from .secrets.env (OPENROUTER_KEY, git-ignored) into this process only, never printed.
Each slot has a USD cap counted from OpenRouter's billed usage.cost; a slot near its cap stops before its next scenario.
#>
param(
  [Parameter(Mandatory)][string]$RunId,
  [int]$Repeats = 1,
  [string[]]$Only = @(),
  [string]$Models = 'v30=openai/gpt-6-luna;v31=anthropic/claude-haiku-5.5;v40=google/gemini-3.1-flash-lite',
  [string]$CostCaps = '{"v30":1.0,"v31":2.0,"v40":1.8}',
  [string]$SlotRepeats = '',   # e.g. 'v40=1': that slot runs fewer repeats than -Repeats
  [switch]$Yes
)
$ErrorActionPreference = 'Stop'
$R = 'E:\ANGI-Agent-Eval'; $run = "$R\runs\$RunId"; $bash = 'C:\Program Files\Git\bin\bash.exe'
$vs = @('v30', 'v31', 'v40')
if (Test-Path $run) { throw "runs\$RunId already exists. Choose another -RunId so earlier results are never overwritten." }
$model = [ordered]@{}; foreach ($p in ($Models -split ';' | Where-Object { $_ })) { $kv = $p -split '=', 2; $model[$kv[0].Trim()] = $kv[1].Trim() }
$caps = $CostCaps | ConvertFrom-Json
$reps = @{}; foreach ($p in ($SlotRepeats -split ';' | Where-Object { $_ })) { $kv = $p -split '=', 2; $reps[$kv[0].Trim()] = [int]$kv[1] }
foreach ($v in @('v30', 'v31', 'v40')) { if (-not $reps.ContainsKey($v)) { $reps[$v] = $Repeats } }
$cfgAll = (Get-Content "$R\tools\scenarios.json" -Raw -Encoding UTF8 | ConvertFrom-Json).scenarios
$all = $cfgAll.id
$Only = $Only -join ','; $ids = if ($Only) { $Only.Split(',') | ForEach-Object { $_.Trim() } } else { $all }
$missing = $ids | Where-Object { $all -notcontains $_ }; if ($missing) { throw "Unknown scenario: $($missing -join ', ')" }
"Run:        runs\$RunId"
foreach ($v in $vs) { "  {0}: {1}  {2} x {3} run(s), cap USD {4}" -f $v, $model[$v], $ids.Count, $reps[$v], $caps.$v }
if (-not $Yes -and (Read-Host 'This calls paid models through OpenRouter. Type YES to start') -ne 'YES') { 'Cancelled.'; return }

function Step($name, [scriptblock]$body) { "`n== $name"; & $body; if ($LASTEXITCODE) { throw "$name failed (exit $LASTEXITCODE)" } }
$started = $false
try {
  $env:VERSIONS = $vs -join ' '
  Step 'Fresh databases and reco containers' { & $bash /e/ANGI-Agent-Eval/tools/stack-up.sh }
  Step 'Clear Agent conversations' { & $bash /e/ANGI-Agent-Eval/tools/reset-agent-data.sh }
  Step 'Add the evaluation test account' { & $bash /e/ANGI-Agent-Eval/tools/seed-test-user.sh }
  Remove-Item Env:VERSIONS

  $dump = if ($env:SEED_DUMP) { $env:SEED_DUMP } else { "$R\seed\angi-prod-sync-20261123.dump" }
  $commit = (Get-Content "$R\src\v40\COMMIT" -Raw).Trim()
  New-Item -ItemType Directory -Force $run | Out-Null
  [ordered]@{ runId = $RunId; startedAt = (Get-Date).ToString('o'); mode = 'live'; upstream = 'openrouter'; agentCode = "V4.0 ($commit), build\v40 in every slot"
    models = $model; costCapsUsd = $caps; reasoningEffort = 'none'
    providerPinning = 'openai -> OpenAI, anthropic -> Anthropic (top-level automatic prompt caching), google -> Google AI Studio; no fallbacks'
    seedDump = (Split-Path $dump -Leaf); seedDumpSha256 = (Get-FileHash $dump -Algorithm SHA256).Hash.ToLower()
    claudeAdaptation = 'response_format json_schema -> json_object + the same schema as a system message; tool strict off (Anthropic limit: 16 union parameters, ANGI has 39)'
    geminiAdaptation = 'response_format left out on forced tool calls only (Gemini rejects forced function calling with a JSON response type)'
    scenarios = $ids; repeats = $reps } | ConvertTo-Json -Depth 4 | Set-Content "$run\run-info.json" -Encoding UTF8

  "`n== Start backends"
  $s = @{}; Get-Content "$R\.secrets.env" | ForEach-Object { if ($_ -match '^([A-Z_]+)=(.*)$') { $s[$matches[1]] = $matches[2].Trim('"', "'") } }
  if (-not $s.OPENROUTER_KEY) { throw 'OPENROUTER_KEY is missing from .secrets.env.' }
  $csproj = [xml](Get-Content 'E:\CapStone\angi-backend\ANGI.WebApi\ANGI.WebApi.csproj')
  $secretsId = $csproj.Project.PropertyGroup.UserSecretsId | Where-Object { $_ } | Select-Object -First 1
  $secrets = Get-Content "$env:APPDATA\Microsoft\UserSecrets\$secretsId\secrets.json" -Raw -Encoding UTF8 | ConvertFrom-Json
  if ($secrets.'Mapbox:AccessToken') { $env:EVAL_MAPBOX_TOKEN = $secrets.'Mapbox:AccessToken' }; $secrets = $null
  $env:EVAL_ALLOW_PAID = 'yes'; $env:EVAL_OPENAI_KEY = $s.OPENROUTER_KEY; $s = $null
  $env:EVAL_UPSTREAM = 'openrouter'; $env:EVAL_COST_CAPS = ($caps | ConvertTo-Json -Compress)
  & "$R\tools\services-start.ps1" -RunId $RunId -Mode live -TokenCap 400000000 -Versions $vs -Build v40 -Models $Models
  $started = $true
  Remove-Item Env:EVAL_OPENAI_KEY, Env:EVAL_MAPBOX_TOKEN -ErrorAction SilentlyContinue
  $slot = @{ v30 = 3; v31 = 4; v40 = 5 }
  foreach ($v in $vs) {
    $url = "http://127.0.0.1:520$($slot[$v])/health"; $end = (Get-Date).AddSeconds(120); $ok = $false
    while (-not $ok -and (Get-Date) -lt $end) { try { $ok = (Invoke-WebRequest -UseBasicParsing $url -TimeoutSec 3).StatusCode -lt 500 } catch { if ($_.Exception.Response) { $ok = $true } else { Start-Sleep 2 } } }
    if (-not $ok) { throw "Backend $v did not become healthy; see runs\$RunId\backend-$v.err" }
    "$v healthy"
  }

  "`n== Run scenarios (one process per model)"
  $procs = foreach ($v in $vs) {
    $a = @("$R\tools\run-eval.mjs", $RunId, '--versions', $v, '--repeats', "$($reps[$v])"); if ($Only) { $a += @('--only', ($ids -join ',')) }
    Start-Process node -ArgumentList $a -NoNewWindow -PassThru -RedirectStandardOutput "$run\run-$v.log" -RedirectStandardError "$run\run-$v.err"
  }
  $procs | Wait-Process
  foreach ($v in $vs) { Get-Content "$run\run-$v.log" -Tail 3 }
  Step 'Rescore against the catalog and the stored drafts' { & node "$R\tools\rescore.mjs" $RunId > "$run\rescore.log" }
  Step 'Billed cost per model' { & node "$R\tools\model-cost.mjs" $RunId }
  # Slot labels v30/v31/v40 are only infrastructure; results are labelled by model (mapping kept in run-info.json "slots").
  $labels = ($vs | ForEach-Object { "$_=" + (($model[$_] -split '/')[-1] -replace '^gpt-6-', '' -replace '^claude-', '' -replace '-[\d.]+$', '' -replace '-[\d.]+-.*$', '') }) -join ','
  Step 'Label results by model' { & node "$R\tools\relabel-run.mjs" $RunId $labels }
  Step 'Report' { & node "$R\tools\report.mjs" $RunId }
  Step 'Comparison table' { & node "$R\tools\model-table.mjs" $RunId > $null }
}
finally {
  Remove-Item Env:EVAL_OPENAI_KEY, Env:EVAL_MAPBOX_TOKEN, Env:EVAL_ALLOW_PAID, Env:VERSIONS, Env:EVAL_UPSTREAM, Env:EVAL_COST_CAPS -ErrorAction SilentlyContinue
  if ($started) { "`n== Stop services"; & "$R\tools\services-stop.ps1" -RunId $RunId }
}
"`nDone. Results: $run"
