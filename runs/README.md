# Evaluation runs

Folders follow the three rounds in "III. AI Assistant Optimization". Raw files inside keep the run id they were recorded with (the `runId` field in `results.jsonl`), shown here as "was".

| Folder | Round in the report | Versions | Scenarios × runs | Was | Used in |
| --- | --- | --- | --- | --- | --- |
| `round-1/` | Evaluation Round 1, 23/11/2026 | V1.1, V2.0, V3.0 | 20 × 1 | — | 5.1, 5.4, charts, Version Rating workbook |
| `round-2/` | Evaluation Round 2, 23/11/2026 | V3.0, V3.1 at `994ce5e` | 10 × 2 | — | 5.2 |
| `round-3/v11-v20-v30/` | Evaluation Round 3, 23/11/2026 | V1.1, V2.0, V3.0 | 2 × 2 | — | 5.3 |
| `round-3/v31/` | Evaluation Round 3, 23/11/2026 | V3.1 at `c75f9b6` | 8 × 2 | — | 5.3 |

All three rounds ran on the real model (gpt-6-luna) against one snapshot of the production database taken on 23/11/2026 (`seed/angi-prod-sync-20261123.dump`, never published: it holds real user data). V1.1 and V2.0 cannot read the meal_role, cooking_method and ingredient tag types, so `tools/legacy-tags.sh` removes those 25 tags from their two databases only. Each folder has a `run-info.json` with the commits, the snapshot checksum and that adjustment. The earlier rounds on local data (19 and 22/11) were deleted on 23/11/2026.

Each round folder has the same files:

| File | Content |
| --- | --- |
| `calls.jsonl` | One line per model call, with the token usage returned by OpenAI |
| `results.jsonl` | Every user message, reply, HTTP status and turn time per scenario |
| `scored.jsonl`, `facts.json`, `metrics.json` | Second scoring pass (`tools/rescore.mjs`): format, faithfulness, catalog checks and the summary numbers of the report tables |
| `backend-*.out`, `proxy.out` | Backend and proxy logs, including the Agent telemetry per turn |

`metrics.json` also holds `costUsd` and `costPerScenarioUsd` ("Cost per task" in the report): the token usage OpenAI returned, priced at gpt-6-luna list price (USD per million tokens: 0.10 uncached input, 0.01 cached input, 0.50 output), divided by every run of the version, passed or not. `tools/cost.mjs` computes it; it reads no database, so `node tools/cost.mjs <folder>` can be rerun on any round.

`round-3/v31/` holds 16 runs, but the V3.1 column of the Round 3 table covers only the two adding scenarios. Its numbers are in `round-3/v31/metrics-adding.json` (edit-add-dish, edit-add-meal, 4 runs); the six other scenarios are in `metrics-planning.json` (12 runs). Both come from `node tools/metrics-subset.mjs round-3/v31 <scenarios> <name>`, which uses the same formulas from `scored.jsonl` and `calls.jsonl`.

Recompute a round with `node tools/report.mjs <folder>`, for example `node tools/report.mjs round-3/v31`. Do not rerun `tools/rescore.mjs` on an old round: it reads the stored drafts from the evaluation databases, which only hold the latest run.

## Other folders

| Folder | Content |
| --- | --- |
| `_checks/` | Check runs made while fixing V3.1 (`addfix-1`, `addfix-2`, `tripfix-1`, `tripfix-2`) and one full 22-scenario run (`full31-1`). Kept for traceability, not reported as rounds. |
| `_setup/` | Pipeline tests with the fake model (`boot`, `dry-1`, `dry-2`, `selftest`), build, restore and CI logs, and the first V3.1 patch (`v31-fix.diff`). No paid calls. |
| `_tables/` | Scenario tables in English and Vietnamese used to write the report. |
