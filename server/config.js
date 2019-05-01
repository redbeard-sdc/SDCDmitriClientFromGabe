// make envconfig.js file with an object named localenv with the following parameter.
// postgres (stores the aws rds postgres endpoint)
// redis (stores the aws elisticache redis endpoint)
// postgrespassword (password for aws RDS service)

const { localenv } = require('./envconfig');
const redis = require('redis');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST || localenv.postgres,
    port: '5432',
    user: 'postgres',
    password: localenv.postgrespassword,
    database: 'postgres'
  },
  pool: { min: 2, max: 16 }
});

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || localenv.redis,
  port: '6379'
});

module.exports = { knex, redisClient };
