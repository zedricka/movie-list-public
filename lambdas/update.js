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
const data = require('../test-data/data.json');
console.log(data);
let updateMovie = `UPDATE ${table} SET title = '${data.title}', year = ${data.year}, genre = '${data.genre}' WHERE id = '${data.id}';`;

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
