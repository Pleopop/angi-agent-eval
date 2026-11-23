param([Parameter(Mandatory)][string]$RunId)
$f="E:\ANGI-Agent-Eval\runs\$RunId\pids.txt"
if(Test-Path $f){
  (Get-Content $f) -split ',' | ForEach-Object { Stop-Process -Id ([int]$_) -Force -ErrorAction SilentlyContinue }
  Remove-Item $f
  'stopped'
} else { 'nothing to stop' }
