module.exports.knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '192.168.1.111',
      user : 'sa',
      password : 'qwerty!@#',
      database : 'lohoi_new'
    }
  });
  