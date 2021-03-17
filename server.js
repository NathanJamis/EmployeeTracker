const inquirer = require('inquirer');
const mysql = require('mysql');
const consoletable = require('console.table');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'code425',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the grid');
    titleLogger();
    init();
});

function titleLogger() {
    console.log(`
    _______  __   __  _______  ___      _______  __   __  _______  _______ 
   |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
   |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
   |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
   |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
   |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
   |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
    _______  ______    _______  _______  ___   _  _______  ______          
   |       ||    _ |  |   _   ||       ||   | | ||       ||    _ |         
   |_     _||   | ||  |  |_|  ||       ||   |_| ||    ___||   | ||         
     |   |  |   |_||_ |       ||       ||      _||   |___ |   |_||_        
     |   |  |    __  ||       ||      _||     |_ |    ___||    __  |       
     |   |  |   |  | ||   _   ||     |_ |    _  ||   |___ |   |  | |       
     |___|  |___|  |_||__| |__||_______||___| |_||_______||___|  |_|  
     
     `)
};                                              

const init = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View employees by manager',
            'View departments',
            'View roles',
            'Add employee',
            'Add department',
            'Add role',
            'Update employee role',
            'Update employee manager',
            'Remove employee',
            'Exit'
        ]
    })
    .then(function(answer) {
        switch(answer.action) {
            case 'View all employees':
                viewAll();
                break;
            case 'View employees by manager':
                viewByManager();
                break;
            case 'View departments':
                viewDepartments();
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'Add employees':
                addEmployee();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'Update employee manager':
                updateManager();
                break;
            case 'Remove employee':
                removeEmployee();
                break;
            case 'Exit':
                exit();
                break;
        }
    });
}

function viewAll() {
    connection.query(

    )
};

function viewByManager() {
    connection.query(
        
    )
};

function viewDepartments() {
    connection.query(
        
    )
}; 

function viewRoles() {

};

function addEmployee() {

};

function addDepartment() {

};

function addRole() {

};

function updateRole() {

};

function updateManager() {

};

function removeEmployee() {

};

function exit() {
    console.log('Exiting... Goodbye!');
    connection.end();
};