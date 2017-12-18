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
let postMovie = `INSERT INTO ${table} VALUES (${data.id}, '${data.title}', ${data.year}, '${data.genre}');`;
console.log(postMovie);

module.exports.post = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB ' + Client.options.database);
    client.release();
    return client.query(postMovie);
  })
 .then (data => {
   console.log(data.rows)
})
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message : 'nice job loser. your post works'
    })
  };
  callback(null, response);
};
