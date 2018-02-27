# Knex Bug Report

This benchmark shows there is a big performance difference when using
`knex.raw()` vs `knex.select(...).where(...)`:

```bash
$ node test.js
preparing database...
running benchmarks...
select `id`, `name` from `test` [knex.raw()   : 9999 rows in 49ms]
select `id`, `name` from `test` [knex.select(): 9999 rows in 191ms]
```

# Tested on

Mac OS
