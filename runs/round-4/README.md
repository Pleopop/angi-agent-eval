# Evaluation Round 4 (26/11/2026): replays of user conversations

The scenarios come from the end-user feedback of 25/11/2026 and from the conversations the team had with the Agent on 26/11/2026. Each conversation is replayed as a script on the real model (gpt-6-luna) and scored by code on the stored draft and the replies (`tools/score-convs.mjs`).

The stack: `tools/start-zone.ps1`. It runs the proxy and two backends on one evaluation database (`angi_eval_zone`, restored from the production snapshot of 23/11/2026), with Mapbox place search enabled because the scenarios name streets and areas.

| Folder | Version | Scenarios × runs | Content |
| --- | --- | --- | --- |
| `v40/` | V4.0, `16efd35` (the build was made at 16:14 on 26/11, after the last source edit at 16:13; the commit is from 17:15) | c13, c14, c16, c17, c19, c20, c21 × 2 | `results.jsonl`, `score.md`, `calls.jsonl` (237 model calls, 6,018,310 tokens) |
| `v31-replays/` | V3.1 `c75f9b6` ("before") and an early V4.0 work-in-progress build ("after") | c10–c15: before × 1, after × 2 | `results.jsonl`, `score.md`; the token log of this run was not kept |
| `area-v31-vs-zonefix/` | V3.1 `c75f9b6` ("before") and a build with only the area fix ("after") | 7 area scenarios × 3 | `results.jsonl`, `scored.jsonl`, `score.md`; the token log was not kept |

Only `v40/` is the committed V4.0 code. The "after" columns of the other two folders are earlier builds from the same day. They show what the area fix did, not V4.0 itself.

Scripts: `tools/run-convs.mjs` (conversation replays), `tools/run-zone.mjs` (area scenarios), `tools/score-convs.mjs`, `tools/analyze.mjs`.
