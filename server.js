const PORT = 3001;
const mysql = require('mysql2');
const inquirer = require('inquirer');


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

function init() {
    inquirer.prompt(questions)
    .then(answers => {
        switch(answers.firstChoices) {
            case 'View all departments':
                viewAllDepts();
                console.log('aye');
                break;
            case 'View all roles':
                console.log('yo');
                break;
            case 'View all employees':
                console.log('3');
                break;
            case 'Add a department':
                console.log('4');
                break;
            case 'Add a role':
                console.log('5');
                break;
            case 'Add an employee':
                console.log('6');
                break;
            case 'Update employee role':
                console.log('7');
                break;
            case 'Exit':
                break;
        };
    });
};
// TODO: don't forget to fomat all this data to look nice when it console logs
function viewAllDepts() {
    const statement = `SELECT * from departments;`;
    connection.query(statement, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(res);
        init();
    });
}

init();