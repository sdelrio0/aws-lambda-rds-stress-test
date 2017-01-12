/**
 * @identifier: { lambdaId }
 */

'use strict';

const initTime = new Date().toString();

console.log("Starting initialization.");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env["DB_ENDPOINT"],
    user: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_DATABASE"],
    charset: 'utf8',
    debug: true
  },
  pool: { min: 0, max: 1 },
  acquireConnectionTimeout: 1000
});

console.log("Initialization done.");

/**
 * Lambda's entry point
 *
 * @param event
 * @param context
 * @param callback
 */
exports.handler = (event, context, callback) => {
  console.log("Starting handler()");
  console.log(`Last init time: ${ initTime }`);

  const lambdaId = event.lambdaId;

  // Read
  process.stdout.write("About to read from DB...");
  knex.raw('SELECT * FROM users;').then(data => {
    console.log("...done: ");
    console.log(JSON.stringify(data, null ,2));
    process.stdout.write("About to write to DB...");

    return knex.raw("INSERT INTO users (usernam, age) VALUES ('text', 123);");
  }).then(data => {
    console.log("...done: ");
    console.log(JSON.stringify(data, null ,2));

    return Promise.resolve();
  }).then(() => {
    context.done(null, lambdaId)
  }).catch(err => {
    console.error("Error occurred. err: ");
    console.error(err);
    context.done(err);
  });
};