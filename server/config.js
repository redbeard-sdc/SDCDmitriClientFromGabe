const redis = require('redis');
const { Pool } = require('pg');

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

const redisClient = redis.createClient({
  host: 'localhost',
  port: '6379'
});

module.exports = { knex, redisClient };
