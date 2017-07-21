
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

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : ''
  }
});

knex.select("id", "first_name", "last_name", "birthdate").from("famous_people").where({ last_name: searchValue }).asCallback((error, results) => {
  results.forEach((result) => {
    console.log("-", result.id, result.first_name, result.last_name, ", born ", formatDate(result.birthdate));
  });
    // handle error
});
