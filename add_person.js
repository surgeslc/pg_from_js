/* Implement an add_person.js script that takes in
the first name, last name and date of a famous person
as three command line arguments and uses Knex to perform an insert. */

const pg = require("pg");
const settings = require("./settings"); // settings.json

const insert = {first_name: process.argv[2], last_name: process.argv[3], birthdate: process.argv[4]};
const table = "famous_people";

//console.log("Will try to insert", process.argv[2], process.argv[3], process.argv[4], "into", table);

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : ''
  }
});

knex.insert(insert).into(table).then(function (id) {
  console.log(id);
})
.finally(function() {
  knex.destroy();
});
;