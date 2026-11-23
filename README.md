# ANGI Agent evaluation

Isolated harness comparing V1.1 (`9106735`), V2.0 (`0706765`), V3.0 (`3214648`) and V3.1 (`c75f9b6`, dev after PR #146). Nothing here runs inside `E:\CapStone`.

## Parts

| Part | Location |
| --- | --- |
| Exported source and builds | `src\`, `build\` (one folder per version) |
| Database and reco | Docker containers `angi-eval-pg`, `angi-eval-reco-v11`, `-v20`, `-v30`, `-v31` |
| Backends | Ports 5201 (V1.1), 5202 (V2.0), 5203 (V3.0), 5204 (V3.1) |
| Token proxy | Port 18100, writes `runs\<id>\calls.jsonl` |
| Scenarios | `tools\scenarios.json` (22 scenarios) |
| Results | `runs\<id>\`; `runs\README.md` maps each folder to its round in the report |

## Rerun a round on the real model (one command)

```powershell
E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId round-4              # 22 scenarios x 4 versions x 1 run
E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId round-4 -Repeats 2   # two runs per scenario
E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId try-1 -Versions v31 -Only edit-add-dish,edit-add-meal
```

It prints the expected tokens and cost, asks you to type YES, then: restores fresh databases and reco containers, clears Agent data, reads the OpenAI key from the angi-backend user secrets into the process only, starts the backends against the token-capped proxy, runs the scenarios, rescores them (catalog checks and, for adding scenarios, the stored drafts), writes `report.md`, and stops the services. The token cap defaults to about 2.5 times the expected use, so a version does not lose its last scenarios to the cap. An existing `runs\<RunId>` is never overwritten.

## Free dry run

The fake model only tests the pipeline. Its token counts are estimates from request size and must not be reported as model usage.

```powershell
E:\ANGI-Agent-Eval\tools\services-start.ps1 -RunId _setup/dry-3
node E:\ANGI-Agent-Eval\tools\run-eval.mjs _setup/dry-3
node E:\ANGI-Agent-Eval\tools\report.mjs _setup/dry-3
E:\ANGI-Agent-Eval\tools\services-stop.ps1 -RunId _setup/dry-3
```
