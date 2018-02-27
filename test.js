const Knex = require('knex')
const ROWS = parseInt(process.env.N) || 10000

const knex = Knex({
  dialect: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
})

async function prepare (rows) {
  await knex.raw('create table test(id bigint(20) primary key, name varchar(50))')

  for (let i = 1; i < rows; i++) {
    await knex.raw('insert into test (id, name) values (?, ?)', [i, 'name for ' + i])
  }
}

async function benchmark (name, query) {
  let start = Date.now()
  let sql = query.toString()
  results = await query
  console.log('%s [%s: %d rows in %dms]', sql, name, results.length, Date.now() - start)
  return results
}

async function test (rows = ROWS) {
  console.log('preparing database...')
  await prepare(rows)

  console.log('running benchmarks...')
  await benchmark('knex.raw()   ', knex.raw('select `id`, `name` from `test`'))
  await benchmark('knex.select()', knex.select('id', 'name').from('test'))
}

test()
.then(() => process.exit(0))
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
