# ANGI Agent evaluation

Hướng dẫn sử dụng bằng tiếng Việt: [HUONG-DAN.md](HUONG-DAN.md).

Isolated harness comparing V1.1 (`9106735`), V2.0 (`0706765`), V3.0 (`3214648`), V3.1 (`c75f9b6`, dev after PR #146) and V4.0 (`16efd35`, branch fix/ANGI-231-agent-edit-plan). Nothing here runs inside `E:\CapStone`.

## Parts

| Part | Location |
| --- | --- |
| Exported source and builds | `src\`, `build\` (one folder per version) |
| Database and reco | Docker containers `angi-eval-pg`, `angi-eval-reco-v11`, `-v20`, `-v30`, `-v31`, `-v40` |
| Backends | Ports 5201 (V1.1), 5202 (V2.0), 5203 (V3.0), 5204 (V3.1), 5205 (V4.0); one runner process per version, in parallel |
| Token proxy | Port 18100, writes `runs\<id>\calls.jsonl` and labels each call by its version route |
| Place search | Real Mapbox when the angi-backend user secrets hold `Mapbox:AccessToken` (the area scenarios name streets and zones) |
| Scenarios | `tools\scenarios.json` (36 scenarios: 22 single requests and short flows, 7 area scenarios, 7 replayed user conversations); data checks in `tools\checks.mjs` |
| Results | `runs\<id>\`; `runs\README.md` maps each folder to its round in the report |

## Rerun a round on the real model (one command)

```powershell
E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId unified-2              # 36 scenarios x 5 versions x 1 run
E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId unified-2 -Repeats 3   # three runs per scenario
node E:\ANGI-Agent-Eval\tools\summary.mjs unified-2               # report tables (summary.md) after the run
E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId try-1 -Versions v31 -Only edit-add-dish,edit-add-meal
```

It prints the expected tokens and cost, asks you to type YES, then: restores fresh databases and reco containers, clears Agent data, reads the OpenAI key from the angi-backend user secrets into the process only, starts the backends against the token-capped proxy, runs the scenarios, rescores them (catalog checks and, for adding scenarios, the stored drafts), writes `report.md`, and stops the services. The token cap defaults to about 2.5 times the expected use, so a version does not lose its last scenarios to the cap. An existing `runs\<RunId>` is never overwritten.

## Compare models on the same Agent code (OpenRouter)

```powershell
E:\ANGI-Agent-Eval\tools\model-compare.ps1 -RunId models-2 -Repeats 3 -SlotRepeats 'v31=1;v40=1'
node E:\ANGI-Agent-Eval\tools\model-table.mjs models-2           # model-table.json: repeat 1 for every model, and all runs without OpenRouter refusals
```

Runs build\v40 (V4.0) in slots v30, v31 and v40, one model per slot (default: openai/gpt-6-luna, anthropic/claude-haiku-5.5, google/gemini-3.1-flash-lite; change with `-Models`). Needs `OPENROUTER_KEY` in `.secrets.env`. The proxy pins each model to its maker's endpoint, records OpenRouter's billed cost per call and stops a slot near its USD cap (`-CostCaps`). Two adaptations are needed and recorded in `run-info.json`: Claude gets JSON mode plus the schema as a system message (Anthropic's constrained output allows 16 union parameters, ANGI's schema has 39), and Gemini's forced tool calls are sent without the JSON response format. Results are labelled by model (`luna`, `haiku`, `gemini`: `run-luna.log`, `"version":"luna"` in `scored.jsonl`, `"route":"luna"` in `calls.jsonl`) by `tools/relabel-run.mjs`; every slot runs the same V4.0 build, and `run-info.json` → `slots` maps each label to the slot's database, reco container, port and proxy route (`v30`, `v31`, `v40`, which still appear inside the backend logs). First result: `runs/models-1`; report docs "Comparing language models for the ANGI Assistant" (English) and "So sánh mô hình ngôn ngữ cho Trợ lý ANGI" (Vietnamese). `runs/models-try-*` are the trial runs that found the two adaptations.

## Free dry run

The fake model only tests the pipeline. Its token counts are estimates from request size and must not be reported as model usage.

```powershell
E:\ANGI-Agent-Eval\tools\services-start.ps1 -RunId _setup/dry-3
node E:\ANGI-Agent-Eval\tools\run-eval.mjs _setup/dry-3
node E:\ANGI-Agent-Eval\tools\report.mjs _setup/dry-3
E:\ANGI-Agent-Eval\tools\services-stop.ps1 -RunId _setup/dry-3
```
