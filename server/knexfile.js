module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL || {
        host: 'localhost',
        database: 'studyhub_dev',
        user: 'postgres',
        password: 'password'
      },
      migrations: {
        directory: './database/migrations'
      },
      seeds: {
        directory: './database/seeds'
      }
    }
  };