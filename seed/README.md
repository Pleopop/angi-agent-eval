# Seed data (not in git)

The rounds in `runs/` used `angi-prod-sync-20261123.dump`, a `pg_dump -Fc` of the production database taken on 23/11/2026 (schema at migration `20261117153015`, 1,040 dishes with vectors). It holds real user accounts, so it is never committed. Its SHA-256 is recorded in each `runs/*/run-info.json`; a copy given to a reviewer can be checked against it.

`test-user.sql` creates the evaluation account `agent.personalized@local.angi.test` and its preference vector in the `angi_eval_*` databases only. It holds the account's password hash, so it is not committed either; the password itself is `EVAL_USER_PASSWORD` in `.secrets.env`.

To run on another machine, place both files here (or point `SEED_DUMP` at another dump) and fill `.secrets.env` from `.secrets.env.example`.
