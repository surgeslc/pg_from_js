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
console.log("searchValue:", searchValue);
const queryString = "SELECT * FROM famous_people WHERE last_name = '" + searchValue + "';";

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(queryString, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log("Found", result.rows.length, "person(s) by the name '" + searchValue + "':");

    result.rows.forEach(function(row) {
      console.log("-", row.id, row.first_name, row.last_name + ", born '" + formatDate(row.birthdate) + "'");
    })

    client.end();
  });
});



/* Write a new script file in this same repo that expects to take in a single command line argument (through ARGV) and use it to find and output famous people by their first or last name.
The experience should look like this:

node lookup_people.js Lincoln
Searching ...
Found 1 person(s) by the name 'Lincoln':
- 1: Abraham Lincoln, born '1809-02-12'
*/