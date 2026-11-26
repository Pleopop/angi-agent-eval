<#
Runs a full evaluation round on the real model in one command, from a clean database to the scored report.

  E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId round-4
  E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId round-4 -Repeats 2
  E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId try-v31 -Versions v31 -Only edit-add-dish,edit-add-meal

Steps: fresh databases and reco containers for every version, Agent data cleared, backends started against the
token-capped proxy, all scenarios of tools\scenarios.json run (22 unless -Only), rescored, reported, services stopped.
Results land in E:\ANGI-Agent-Eval\runs\<RunId>. The OpenAI key is read from the angi-backend user secrets into this
process only and removed at the end; it is never printed or written to disk.

The token cap is generous on purpose (about 2.5 times the expected use): a cap reached mid-run would leave every
version missing the same last scenarios. Pass -TokenCap to set your own.
#>
param(
  [Parameter(Mandatory)][string]$RunId,
  [int]$Repeats = 1,
  [string[]]$Versions = @('v11','v20','v30','v31','v40'),
  [string[]]$Only = @(),
  [long]$TokenCap = 0,
  [switch]$Yes
)
$ErrorActionPreference = 'Stop'
$R = 'E:\ANGI-Agent-Eval'; $run = "$R\runs\$RunId"; $bash = 'C:\Program Files\Git\bin\bash.exe'
$slot = @{ v11 = 1; v20 = 2; v30 = 3; v31 = 4; v40 = 5 }
$vs = ($Versions -join ',').Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
foreach ($v in $vs) { if (-not $slot.ContainsKey($v)) { throw "Unknown version '$v'. Use v11, v20, v30, v31 or v40." } }
if (Test-Path $run) { throw "runs\$RunId already exists. Choose another -RunId so earlier results are never overwritten." }

# Estimate from the earlier rounds, per scenario kind: single requests about 60k tokens, area scenarios about 110k,
# replayed conversations about 450k; about USD 0.06 per million tokens.
$cfgAll = (Get-Content "$R\tools\scenarios.json" -Raw -Encoding UTF8 | ConvertFrom-Json).scenarios
$all = $cfgAll.id
$per = @{ area = 110000; conversation = 450000 }
$Only = $Only -join ','; $ids = if ($Only) { $Only.Split(',') | ForEach-Object { $_.Trim() } } else { $all }
$missing = $ids | Where-Object { $all -notcontains $_ }; if ($missing) { throw "Unknown scenario: $($missing -join ', ')" }
$conversations = $ids.Count * $vs.Count * $Repeats
$expected = ($cfgAll | Where-Object { $ids -contains $_.id } | ForEach-Object { if ($per.ContainsKey($_.kind)) { $per[$_.kind] } else { 60000 } } | Measure-Object -Sum).Sum * $vs.Count * $Repeats
if ($TokenCap -le 0) { $TokenCap = [math]::Max(2000000, [long]($expected * 1.6)) }
"Run:            runs\$RunId"
"Versions:       $($vs -join ', ')"
"Scenarios:      $($ids.Count) x $Repeats run(s) = $conversations conversations"
"Expected:       about {0:N0} tokens, about USD {1:N2}" -f $expected, ($expected / 1e6 * 0.06)
"Token cap:      {0:N0} tokens, at most about USD {1:N2}" -f $TokenCap, ($TokenCap / 1e6 * 0.06)
if (-not $Yes -and (Read-Host 'This calls the paid OpenAI API. Type YES to start') -ne 'YES') { 'Cancelled.'; return }

function Step($name, [scriptblock]$body) { "`n== $name"; & $body; if ($LASTEXITCODE) { throw "$name failed (exit $LASTEXITCODE)" } }
$started = $false
try {
  Step 'Fresh databases and reco containers' {
    $env:VERSIONS = $vs -join ' '
    & $bash /e/ANGI-Agent-Eval/tools/stack-up.sh
  }
  $env:VERSIONS = $vs -join ' '
  Step 'Clear Agent conversations' { & $bash /e/ANGI-Agent-Eval/tools/reset-agent-data.sh }
  Step 'Add the evaluation test account' { & $bash /e/ANGI-Agent-Eval/tools/seed-test-user.sh }
  if ($vs -contains 'v11' -or $vs -contains 'v20') { Step 'Drop tag types V1.1 and V2.0 cannot read' { & $bash /e/ANGI-Agent-Eval/tools/legacy-tags.sh } }
  Remove-Item Env:VERSIONS

  # Which code and data this run used, written before any model call so the folder always carries its provenance.
  $manifest = Get-Content "$R\manifest.json" -Raw | ConvertFrom-Json
  $dump = if ($env:SEED_DUMP) { $env:SEED_DUMP } else { "$R\seed\angi-prod-sync-20261123.dump" }
  $commits = [ordered]@{}
  foreach ($v in $vs) { $f = "$R\src\$v\COMMIT"; $commits[$v] = if (Test-Path $f) { (Get-Content $f -Raw).Trim() } else { $manifest.versions.$v } }
  New-Item -ItemType Directory -Force $run | Out-Null
  [ordered]@{ runId = $RunId; startedAt = (Get-Date).ToString('o'); model = 'gpt-6-luna'; mode = 'live'; versions = $commits
    seedDump = (Split-Path $dump -Leaf); dataAdjustments = $(if ($vs -contains 'v11' -or $vs -contains 'v20') { 'V1.1 and V2.0 databases: tags of types meal_role, cooking_method and ingredient removed (tools/legacy-tags.sh)' } else { 'none' }); seedDumpSha256 = (Get-FileHash $dump -Algorithm SHA256).Hash.ToLower()
    scenarios = $ids; repeats = $Repeats; tokenCap = $TokenCap } | ConvertTo-Json -Depth 4 | Set-Content "$run\run-info.json" -Encoding UTF8

  "`n== Start backends against the real model"
  $csproj = [xml](Get-Content 'E:\CapStone\angi-backend\ANGI.WebApi\ANGI.WebApi.csproj')
  $secretsId = $csproj.Project.PropertyGroup.UserSecretsId | Where-Object { $_ } | Select-Object -First 1
  $key = (Get-Content "$env:APPDATA\Microsoft\UserSecrets\$secretsId\secrets.json" -Raw -Encoding UTF8 | ConvertFrom-Json).'Ai:ApiKey'
  if (-not $key) { throw 'Ai:ApiKey is missing from the angi-backend user secrets.' }
  $secrets = Get-Content "$env:APPDATA\Microsoft\UserSecrets\$secretsId\secrets.json" -Raw -Encoding UTF8 | ConvertFrom-Json
  if ($secrets.'Mapbox:AccessToken') { $env:EVAL_MAPBOX_TOKEN = $secrets.'Mapbox:AccessToken' }; $secrets = $null
  $env:EVAL_ALLOW_PAID = 'yes'; $env:EVAL_OPENAI_KEY = $key; $key = $null
  & "$R\tools\services-start.ps1" -RunId $RunId -Mode live -TokenCap $TokenCap -Versions $vs
  $started = $true
  Remove-Item Env:EVAL_OPENAI_KEY, Env:EVAL_MAPBOX_TOKEN -ErrorAction SilentlyContinue
  foreach ($v in $vs) {
    $url = "http://127.0.0.1:520$($slot[$v])/health"; $end = (Get-Date).AddSeconds(120); $ok = $false
    while (-not $ok -and (Get-Date) -lt $end) { try { $ok = (Invoke-WebRequest -UseBasicParsing $url -TimeoutSec 3).StatusCode -lt 500 } catch { if ($_.Exception.Response) { $ok = $true } else { Start-Sleep 2 } } }
    if (-not $ok) { throw "Backend $v did not become healthy; see runs\$RunId\backend-$v.err" }
    "$v healthy"
  }

  # One runner per version, in parallel: the proxy labels calls by version route, so nothing is mixed up.
  "`n== Run scenarios (one process per version)"
  $procs = foreach ($v in $vs) {
    $a = @("$R\tools\run-eval.mjs", $RunId, '--versions', $v, '--repeats', "$Repeats"); if ($Only) { $a += @('--only', ($ids -join ',')) }
    Start-Process node -ArgumentList $a -NoNewWindow -PassThru -RedirectStandardOutput "$run\run-$v.log" -RedirectStandardError "$run\run-$v.err"
  }
  $procs | Wait-Process
  foreach ($v in $vs) { Get-Content "$run\run-$v.log" -Tail 3 }
  Step 'Rescore against the catalog and the stored drafts' { & node "$R\tools\rescore.mjs" $RunId > "$run\rescore.log" }
  Step 'Report' { & node "$R\tools\report.mjs" $RunId }
}
finally {
  Remove-Item Env:EVAL_OPENAI_KEY, Env:EVAL_MAPBOX_TOKEN, Env:EVAL_ALLOW_PAID, Env:VERSIONS -ErrorAction SilentlyContinue
  if ($started) { "`n== Stop services"; & "$R\tools\services-stop.ps1" -RunId $RunId }
}
"`nDone. Results: $run"
"  report.md     pass rate, tokens and latency per version"
"  metrics.json  numbers for the summary tables (format, faithfulness, catalog checks)"
"  rescore.log   scenarios that failed and why"
