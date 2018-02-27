const knex = require('knex')

const db = knex({
  dialect: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
})

async function prepare (n) {
  await db.raw('create table test(id bigint(20) primary key, name varchar(50))')

  for (let i = 1; i < n; i++) {
    await db.raw('insert into test (id, name) values (?, ?)', [i, 'name for ' + i])
  }
}

async function benchmark (query) {
  let start = Date.now()
  let sql = query.toString()
  results = await query
  console.log('%s [%d rows in %dms]', sql, results.length, Date.now() - start)
  return results
}

async function test (n = 10000) {
  console.log('preparing database...')
  await prepare(n)

  console.log('running benchmarks...')
  await benchmark(db.raw('select `id`, `name` from `test`'))
  await benchmark(db.select('id', 'name').from('test'))
}

test()
.then(() => process.exit(0))
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
