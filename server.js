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
    let query = `SELECT 
    employee.id, 
    first_name AS 'First name', 
    last_name AS 'Last name', 
    role.title AS 'Role', 
    role.salary AS 'Salary', 
    department.name AS 'Department' 
    FROM employee
    JOIN role ON role.id = employee.role_id
    JOIN department ON department.id = role.department_id;`;
    console.log('Viewing all employees\n');    
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

// function viewByManager() {};

function viewDepartments() {
    let query = `SELECT * FROM department`;
    console.log('Showing departments\n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}; 

function viewRoles() {
    let query = `SELECT role.title, role.salary, department.name FROM role
    INNER JOIN department ON department.id = role.department_id;`;
    console.log('Showing roles\n');
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function addEmployee() {

};

function addDepartment() {
    inquirer.prompt({
        name: 'deptName',
        type: 'input',
        message: 'What is the department name?'
    }).then((answer) => {
        connection.query(`INSERT INTO department (name) VALUES ('${answer.deptName})`,
        (err, res) => {
            if (err) throw err;
            console.log('Department has been added');
            init();
        })
    })
};

function addRole() {
    let query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?'
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'What department is the role under?',
                choices: res.map(choice => choice.name)
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO role (title,salary,department_id)
            VALUES (
            '${answer.title}',
            '${answer.salary},
            (SELECT id FROM department WHERE name = '${answer.department_id}'));`,
            (err, res) => {
                if (err) throw err;
                console.log('Role has been added.');
                init();
            });
        });
    })
};

function updateRole() {
    let query = `SELECT CONCAT(first_name, " ", last_name) AS full_name from employee;
    SELECT * FROM role;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'employee_id',
                type: 'list',
                message: 'Select an employee to update:',
                choices: res[0].map(choice => choice.full_name)
            },
            {
                name: 'newRole',
                type: 'list',
                message: 'Select a new role for employee:',
                choices: res[1].map(choice => choice.title)
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee
            SET role_id = (SELECT role.id FROM role WHERE title = '${answer.newRole}')
            WHERE id = (SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = '${answer.employee_id}')`,
            (err, res) => {
                if (err) throw err;
                console.log('Employee updated.');
            })
        })
    })
};

// function updateManager() {};

// function removeEmployee() {};

function exit() {
    console.log('Exiting... Goodbye!');
    connection.end();
};