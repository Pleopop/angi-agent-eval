#!/usr/bin/env bash
R=/e/ANGI-Agent-Eval; export DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1
for v in v11 v20 v30; do
  s=$(date +%s); cd $R/src/$v
  dotnet build ANGI.WebApi/ANGI.WebApi.csproj -c Release -o $R/build/$v -v q -nologo -p:TreatWarningsAsErrors=false > $R/runs/_setup/build-$v.log 2>&1; c=$?
  echo "$v exit=$c seconds=$(( $(date +%s)-s )) size=$(du -sh $R/build/$v 2>/dev/null | cut -f1)"
done
