'use strict';

const Pool = require('pg-pool');
const config = require('./config.json');
const {table, host, database, user, password, port} = config;
const Client = new Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis : 1000
});

let updateMovie = "UPDATE " + table + " SET id = 4, title = 'MarksALoser', year = 360, genre = 'RomCom' WHERE id = 3;";

module.exports.update = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB ' + Client.options.database);
    client.release();
    return client.query(updateMovie);
  })
 .then (data => {
   console.log(data.rows)
})
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message : 'nice update nerd, dont make a mistake next time'
    })
  };
  callback(null, response);
};
