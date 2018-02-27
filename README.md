# Knex Bug Report

This benchmark shows there is a big performance difference when using
`knex.raw()` vs `knex.select(...).from(...)`.

# Libraries

Knex 0.14.4
SQLite3 3.1.13

# Test Results

## Mac OS High Sierra 10.13.3

```
$ node --version
v8.9.1

$ node test.js
preparing database...
running benchmarks...
select `id`, `name` from `test` [knex.raw()   : 9999 rows in 49ms]
select `id`, `name` from `test` [knex.select(): 9999 rows in 191ms]
```

```
$ node --version
v9.6.1

$ node test.js
preparing database...
running benchmarks...
select `id`, `name` from `test` [knex.raw()   : 9999 rows in 37ms]
select `id`, `name` from `test` [knex.select(): 9999 rows in 131ms]
```

## Arch Linux 4.14.15-1-ARCH

NodeJS 9.5.0

```
$ node --version
v9.5.0

$ node test.js
preparing database...
running benchmarks...
select `id`, `name` from `test` [knex.raw()   : 9999 rows in 29ms]
select `id`, `name` from `test` [knex.select(): 9999 rows in 100ms]
```

