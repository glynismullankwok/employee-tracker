const inquirer = require("inquirer");
const connection = require("./database/connections");

function questions() {
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
                "Update employee role",
                "Exit"
            ]
        })
        .then(function (response) {
            if (response.action === 'View all departments') {
                viewDepartments();
            } else if (response.action === 'View all roles') {
                viewRoles();
            } else if (response.action === 'View all employees') {
                viewEmployees();
            } else if (response.action === 'Add a department') {
                addDepartment();
            } else if (response.action === 'Add a role') {
                addRole();
            } else if (response.action === 'Add an employee') {
                addEmployee();
            } else if (response.action === 'Update employee role') {
                updateRole();
            } else if (response.action === 'Exit') {
                exit();
            }

        })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        console.log('Departments:')
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
            inquirer.prompt([{
             type:"list",
            name:"choices",
            choices: ["back to main menu", "Exit"]
            }]).then ((answer)=>{
                if (answer.choices[0]){
                    questions();
                }else if (answer.choices[1]){
                    exit();
                }
            })
        

    })
};
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        console.log('Roles:')
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} |
            Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        inquirer.prompt([{
            type:"list",
           name:"choices",
           choices: ["back to main menu", "Exit"]
           }]).then ((answer)=>{
               if (answer.choices[0]){
                   questions();
               }else if (answer.choices[1]){
                   exit();
               }
           })
    });
};
function viewEmployees() {
    var query = ("SELECT id, first_name, last_name, role_id, manager_id FROM employee");
    connection.query(query, function (err, res) {
        console.log(res)
        console.log('Employees:')
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} |
            Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`)
        })
        inquirer.prompt([{
            type:"list",
           name:"choices",
           choices: ["back to main menu", "Exit"]
           }]).then ((answer)=>{
               if (answer.choices[0]){
                   questions();
               }else if (answer.choices[1]){
                   exit();
               }
           })
    });
};
function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
        })
        .then(function (response) {
            var query = "INSERT INTO department (name) VALUES (?)";
            connection.query(query, answer.response, function (err, res) {
                console.log('Department added: ${answer.department()')
            })
            viewDepartments();
        });
}
function addRole() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw (err);
        inquirer
            .prompt([{
                name: "title",
                type: "input",
                message: "What is the title of the new role?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the new role?",
            },
            {
                name: "departmentName",
                type: "list",
                message: "Which department does this role fall under?",
                choices: function () {
                    var choicesArray = [];
                    res.forEach(res => {
                        choicesArray.push(
                            res.name
                        );
                    })
                    return choicesArray;
                }
            }
            ])

            .then(function (answer) {
                const department = answer.departmentName;
                connection.query('SELECT * FROM DEPARTMENT', function (err, res) {
                    if (err) throw (err);
                    let filteredDept = res.filter(function (res) {
                        return res.name == department;
                    }
                    )
                    let id = filteredDept[0].id;
                    let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
                    let values = [answer.title, parseInt(answer.salary), id]
                    console.log(values);
                    connection.query(query, values,
                        function (err, res, fields) {
                            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
                        })
                    viewRoles()
                })
            })
    })
}

   async function addEmployee() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw (err);
        inquirer
            .prompt([{
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "last-name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "title",
                type: "list",
                message: "What is the employee's title?",
                choices: [
                    'Sales Lead',
                    'Salesperson',
                    'Lead Engineer',
                    'Software Engineer',
                    'Account Manager',
                    'Legal Team Lead',
                    'Lawyer'
                ]
            
                
               },
            
            ])

            .then(function (answer) {
                
                const role = answer.role_id;
                connection.query('SELECT * FROM role', function (err, res) {
                    if (err) throw (err);
                    let filteredRole = res.filter(function (res) {
                        return res.role == role_id;
                    })
                    let role_id = filteredRole[0].id;
                    connection.query("SELECT * FROM employee", function (err, res) {
                        inquirer
                            .prompt([
                                {
                                    name: "manager",
                                    type: "list",
                                    message: "Who is your manager?",
                                    choices: function () {
                                        managersArray = []
                                        res.forEach(res => {
                                            managersArray.push(
                                                res.last_name)

                                        })
                                        return managersArray;
                                    }
                                }
                            ]).then(function (managerAnswer) {
                                const manager = managerAnswer.manager;
                                connection.query('SELECT * FROM employee', function (err, res) {
                                    if (err) throw (err);
                                    let filteredManager = res.filter(function (res) {
                                        return res.last_name == manager;
                                    })
                                    let managerId = filteredManager[0].id;
                                    console.log(managerAnswer);
                                    let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                                    let values = [answer.first_name, answer.last_name, role_id, manager_id]
                                  
                                    connection.query(query, values,
                                        function (err, res, fields) {
                                            console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                                        })
                                    viewEmployees();
                                })
                            })
                    })
                })
            })
    })
}

function updateRole() {
    connection.query('SELECT * FROM employee', function (err, result) {
        if (err) throw (err);
        inquirer
            .prompt([
                {
                    name: "employeeName",
                    type: "list",

                    message: "Which employee's role is changing?",
                    choices: function () {
                        employeeArray = [];
                        result.forEach(result => {
                            employeeArray.push(
                                result.last_name
                            );
                        })
                        return employeeArray;
                    }
                }
            ])

            .then(function (answer) {
                console.log(answer);
                const name = answer.employeeName;

                connection.query("SELECT * FROM role", function (err, res) {
                    inquirer
                        .prompt([
                            {
                                name: "role",
                                type: "list",
                                message: "What is their new role?",
                                choices: function () {
                                    rolesArray = [];
                                    res.forEach(res => {
                                        rolesArray.push(
                                            res.title)

                                    })
                                    return rolesArray;
                                }
                            }
                        ]).then(function (rolesAnswer) {
                            const role = rolesAnswer.role;
                            console.log(rolesAnswer.role);
                            connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                                if (err) throw (err);
                                let roleId = res[0].id;
                                let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                                let values = [roleId, name]
                                console.log(values);
                                connection.query(query, values,
                                    function (err, res, fields) {
                                        console.log(`You have updated ${name}'s role to ${role}.`)
                                    })
                                viewEmployees();
                            })
                        })
                })


            })
    })

}
function exit(){
    connection.end
}
questions();
