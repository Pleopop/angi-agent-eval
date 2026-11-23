#!/usr/bin/env bash
# Exports one angi-backend commit into src/<slot> and builds it into build/<slot>, recording the commit in src/<slot>/COMMIT.
# usage: build-version.sh <slot> <commit>      e.g. build-version.sh v31 994ce5e
set -euo pipefail
slot=$1; commit=$2; R=/e/ANGI-Agent-Eval; export DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1
full=$(git -C /e/CapStone/angi-backend rev-parse --short "$commit")
rm -rf "$R/src/$slot.new"; mkdir -p "$R/src/$slot.new"
git -C /e/CapStone/angi-backend archive "$full" | tar -x -C "$R/src/$slot.new"
(cd "$R/src/$slot.new" && dotnet build ANGI.WebApi/ANGI.WebApi.csproj -c Release -o "$R/build/$slot" -v q -nologo -p:TreatWarningsAsErrors=false > "$R/runs/_setup/build-$slot.log" 2>&1)
rm -rf "$R/src/$slot"; mv "$R/src/$slot.new" "$R/src/$slot"; echo "$full" > "$R/src/$slot/COMMIT"
echo "$slot built from $full"
