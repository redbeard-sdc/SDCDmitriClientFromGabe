const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    database: 'postgres'
  },
  pool: { min: 2, max: 64 }
});

module.exports = { knex };
