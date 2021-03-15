const inquirer = require('inquirer');
const mysql = require('require');
require('console.table');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'code425',
    database: 'employees_db'
});