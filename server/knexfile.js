module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        database: 'studyhub_dev',
        user: 'postgres',
        password: 'astrothunder'
      },
      migrations: {
        directory: './database/migrations'
      },
      seeds: {
        directory: './database/seeds'
      }
    }
  };