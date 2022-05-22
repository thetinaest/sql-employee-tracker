const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',
  database: 'emp_tracker',
  user: 'root',
  password: 'TinaSQL',
});

const questions = [{
    type: 'list',
    name: 'firstChoices',
    message: 'Please select what you would like to do.',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Exit'
    ]
}];

const deptQuestion = [{
    type: 'input',
    name: 'deptAdd',
    message: 'What department would you like to add?'
}];

const roleQuestions = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of this role?'
    },
    {
        type: 'number',
        name: 'roleSalary',
        message: 'What is the annual salary for this role? (Please only enter a number. Do not include commas or a currency symbol.'
    },
    {
        type: 'list',
        name: 'deptId',
        message: 'What department does this role belong to?',
        choices: [
            'Engineering',
            'Finance',
            'Marketing'
        ]
    }
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s FIRST name?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s LAST name?'
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is this employee\'s role?',
        choices: [
            'Developer',
            'Software Engineer',
            'Accountant',
            'Intern',
            'Copywriter'
        ]
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is this employee\'s manager?',
        choices: [
            'Mike Chan',
            'Ashley Rodriquez'
        ]
    }
]

const updateQuestions = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: [
            'Kevin',
            'Kunal',
            'Malia',
            'Sarah',
            'Tom',
            'Amanda'
        ]
    },
    {
        type: 'list',
        name: 'empRole',
        message: 'What is this employee\'s new role?',
        choices: [
            'Developer',
            'Software Engineer',
            'Accountant',
            'Intern',
            'Copywriter'
        ]
    }
];

function init() {
    inquirer.prompt(questions)
    .then(answers => {
        switch(answers.firstChoices) {
            case 'View all departments':
                viewAllDepts();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployee();
                break;
            case 'Exit':
                endAll();
                break;
        };
    });
};

function viewAllDepts() {
    const statement = `SELECT * FROM departments;`;
    connection.query(statement, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(res);
        init();
    });
};

function viewAllRoles() {
    const statement = `SELECT roles.id, title, salary, department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id;`;
    connection.query(statement, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(res);
        init();
    });
};

function viewAllEmployees() {
    const statement = `SELECT * FROM employees INNER JOIN roles ON employees.role_id = roles.id;`;
    connection.query(statement, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(res);
        init();
    });
};

function addDepartment() {
    inquirer.prompt(deptQuestion)
    .then(answer => {
        const statement = `INSERT INTO departments (department_name) VALUES (?)`;
        params = [answer.deptAdd];

        connection.query(statement, params, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('New department added!');
            init();
        });
    })
};

function addRole() {
    inquirer.prompt(roleQuestions)
    .then(answer => {
        console.log(answer);
        const statement = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        params = [answer.roleTitle, answer.roleSalary, getDeptId(answer.deptId)];

        connection.query(statement, params, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('New role added!');
            init();
        });
    })
};

function addEmployee() {
    inquirer.prompt(employeeQuestions)
    .then(answer => {
        console.log(answer);
        const statement = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        params = [answer.firstName, answer.lastName, getRoleId(answer.role), getManagerId(answer.manager)];

        connection.query(statement, params, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('New employee added!');
            init();
        });
    })
};

function updateEmployee() {
    inquirer.prompt(updateQuestions)
    .then(answer => {
        console.log(answer);
        const statement = `UPDATE employees SET role_id = ? WHERE first_name = ?`;
        params = [getRoleId(answer.empRole), answer.employee];

        connection.query(statement, params, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Employee updated!');
            init();
        });
    });
};

function endAll() {
    console.log('\n');
    console.log('*------------------*');
    console.log('---- Good Bye! ----');
    console.log('*------------------*');
    console.log('\n');

    connection.end();

}

function beginAll() {
    console.log('\n');
    console.log('*------------------*');
    console.log('---- Welcome to ---');
    console.log('----- Employee ----');
    console.log('----- Tracker! ----');
    console.log('*------------------*');
    console.log('\n');
}

//functions that return ids that the db understands
function getDeptId(deptId) {
    let id = 0;
    switch(deptId) {
        case 'Developer':
            id = 2;
            break;
        case 'Finance':
            id = 3;
            break;
        case 'Marketing':
            id = 4;
            break;       
    }
    return id;
}

function getRoleId(role) {
    let id = 0;
    switch(role) {
        case 'Engineering':
            id = 2;
            break;
        case 'Software Engineer':
            id = 3;
            break;
        case 'Accountant':
            id = 4;
            break; 
        case 'Intern':
            id = 5;
            break;  
        case 'Copywriter':
            id = 6;
            break;    
    }
    return id;
}

function getManagerId(manager) {
    let id = 0;
    switch(manager) {
        case 'Mike Chan':
            id = 1;
            break;
        case 'Ashley Rodriquez':
            id = 2;
            break; 
    }
    return id;
}

beginAll();
init();