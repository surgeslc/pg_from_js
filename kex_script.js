/* Look for opportunities to separate data access from input/output */

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const pg = require("pg");
const settings = require("./settings"); // settings.json

const searchValue = process.argv[2];
const queryString = "SELECT * FROM famous_people WHERE last_name = '" + searchValue + "';";

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : '',
    password : '',
    database : 'famous_people'
  }
});

// MODEL
// select short, long from urls where short = "abc";
// knex.select("short", "long").from("urls").where({ short: "abc" });

knex.select().from("famous_people").where({ last_name: searchValue }); asCallback((error, results) => {
  // handle error
  results.forEach((result) => {
    console.log("-", result.id, result.first_name, result.last_name, ", born ", result.birthdate);
  });
});
