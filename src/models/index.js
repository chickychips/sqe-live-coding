const db = require('knex')({
    client: 'pg',
    connection: {
      host : '',
      port : 5432,
      user : 'postgres',
      password : '',
      database : '',
      ssl: false
    }
  });

  module.exports = db;