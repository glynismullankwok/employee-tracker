const inquirer = require("inquirer");
const mysql = require("mysql");
const { start } = require("repl");

const connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "password",
    database: "emptrack_db"
});

connection.connect(function(err){
    if (err) throw err;
    questions();
});

function questions(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a role",
            "Add an employee",
            Update employee role",
            "Exit"
        ]
    })
    .then(function(response){
        if (response.action === 'View all departments') {
            viewDepartments();
        }else if (response.action === 'View all roles') {
            viewRoles();
        }else if (response.action === 'View all employees') {
            viewEmployees();
        }else if (response.action === 'Add a department') {
            addDepartment();
        }else if (response.action === 'Add a role') {
            addRole();
        }else if (response.action === 'Add an employee') {
            addEmployee();
        }else if (response.action === 'Update employee role') {
            updateRole();
        }else if (response.action === 'Exit') {
            connection.end();
        }
    
    })
}

function viewDepartments(){
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.log('Departments:')
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
        start();
    });
};
function viewRoles(){
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        console.log('Roles:')
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} |
            Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        start();
    });
};
function viewEmployees(){
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        console.log('Employees:')
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee_first_name} ${employee_last_name} |
            Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`)
        })
        start();
    });
};
function addDepartment(){
    inquirer
    .prompt({
        name: "department",
        type: "input",
        message: "What is the name of the new department?",
    })
    .then(function(response){
    var query = "INSERT INTO department (name) VALUES (?)";
    connection.query(query, answer.response, function(err, res) {
        console.log('Department added: ${answer.department()')
    })
        viewDepartments();
    });
}
