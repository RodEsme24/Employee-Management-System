const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bubbly25!",
    database: "HW12"
});

connection.connect();

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax

var sql = "CREATE TABLE department(id INT PRIMARY KEY, name VARCHAR(255))";
connection.query(sql, function (err, result) {
    // if (err) console.log(err);
    console.log("Table created");
});
var sql = "CREATE TABLE roles(id INT PRIMARY KEY, title VARCHAR(30), salary DECIMAL, department_id INT)";
connection.query(sql, function (err, result) {
    // if (err) console.log(err);
    console.log("Table created");
});
var sql = "CREATE TABLE employees(id INT PRIMARY KEY, first_name VARCHAR(30),last_name VARCHAR(30),manager_id INT, role_id  INT)";
connection.query(sql, function (err, result) {
    // if (err) console.log(err);
    console.log("Table created");
});

var inquirer = require("inquirer")
intro()
function intro() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'intro',
                message: 'Would you like to add,views,or update?',
                choices: ['add', 'views', 'update'],
            },
        ])
        .then(answers => {
            console.info('Answer:', answers.intro)
            switch (answers.intro) {
                case "add":
                    console.log("i want to add")
                    add()
                    break;
                case "views":
                    console.log("i want to views")
                    views()
                    break;
                case "update":
                    console.log("i want to update")
                    update()
                    break;

            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}



function add() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'add',
                message: 'Would you like to add departments, roles, or employees?',
                choices: ["departments", "roles", "employees"],
            },
        ])
        .then(answers => {
            console.info('Answer:', answers.add)
            switch (answers.add) {
                case "departments":
                    console.log("i want to add department")
                    inquirer
                        .prompt([{
                            type: 'number',
                            name: 'id',
                            message: 'What is your department ID?',

                        },

                        {
                            type: 'input',
                            name: 'name',
                            message: 'What is your department name?',

                        }

                        ])
                        .then(answers => {
                            console.info('Answer:', answers.id)
                            console.info('Answer:', answers.name)
                            var sql = `INSERT INTO department (name, id) VALUES ('${answers.name}','${answers.id}')`;
                            connection.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("succesfully stored");
                            });
                            intro()
                        })
                    break;
                case "roles":
                    console.log("i want to add roles")
                    inquirer
                        .prompt([{
                            type: 'number',
                            name: 'id',
                            message: 'What is your role ID?',

                        },

                        {
                            type: 'input',
                            name: 'title',
                            message: 'What is your title?',

                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is your salary?',

                        },
                        {
                            type: 'number',
                            name: 'department_id',
                            message: 'What is your department_id?',

                        }

                        ])
                        .then(answers => {

                            var sql = `INSERT INTO roles (id, title, salary, department_id) VALUES ('${answers.id}','${answers.title}','${answers.salary}','${answers.department_id}')`;
                            connection.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("succesfully stored");
                            });
                            intro()
                        })
                    break;
                case "employees":
                    console.log("i want to add employees")
                    inquirer
                        .prompt([{
                            type: 'number',
                            name: 'id',
                            message: 'What is your employee ID?',

                        },

                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'What is your first name?',

                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'What is your last name?',

                        },
                        {
                            type: 'number',
                            name: 'role_id',
                            message: 'What is your role_id?',
                        },

                        {
                            type: 'number',
                            name: 'manager_id',
                            message: 'What is your manager_id?',
                        },


                        ])
                        .then(answers => {

                            var sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES ('${answers.id}','${answers.first_name}','${answers.last_name}','${answers.role_id}','${answers.manager_id}')`;
                            connection.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("succesfully stored");
                            });
                            intro()
                        })
                    break;

            }
        })

        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}
function views() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'views',
                message: 'Would you like to view departments, roles, or employees??',
                choices: ["departments", "roles", "employees"],
            },
        ])
        .then(answers => {
            console.info('Answer:', answers.views)
            switch (answers.views) {
                case "departments":
                    console.log("i want to view employees")
                    var sql = `SELECT * FROM department `;
                
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.table(result);
                        intro()
                    });
                    
                
                    break;
                case "roles":
                    console.log("i want to view roles")
                    var sql = `SELECT * FROM roles `;
                
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.table(result);
                        intro()
                    });
                
                    break;
                case "employees":
                    console.log("i want to view employees")
                    var sql = `SELECT * FROM employees `;
                
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.table(result);
                        intro()
                    });
                    break;

            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}
function update() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'update',
                message: 'Would you like to update departments, roles, or employees?',
                choices: ["departments", "roles", "employees"],
            },
        ])
        .then(answers => {
            console.info('Answer:', answers.update)
            switch (answers.update) {
                case "departments":
                    inquirer
                        .prompt([
                            {
                        
                                type: 'input',
                                name: 'identifier',
                                message: 'What is department ID that you want to update?',
    
    
                            },
                            {
                        
                            type: 'number',
                            name: 'id',
                            message: 'What is department ID?',


                        },

                        {
                            type: 'input',
                            name: 'name',
                            message: 'What is your department name?',

                        }

                        ])
                        .then(answers => {
                            console.info('Answer:', answers.id)
                            console.info('Answer:', answers.name)
                            var sql = `UPDATE department  SET name= '${answers.name}', id='${answers.id}' WHERE id='${answers.identifier}'`;
                            connection.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("succesfully stored");
                            });
                            intro()
                        })
                    break;
                case "roles":
                    inquirer
                    .prompt([
                        {
                        
                            type: 'input',
                            name: 'identifier',
                            message: 'What is the role ID that you want to update?',


                        },
                        
                        {
                        type: 'number',
                        name: 'id',
                        message: 'What is your role id?',

                    },

                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is your title?',

                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is your salary?',

                    },
                    {
                        type: 'number',
                        name: 'department_id',
                        message: 'What is your department_id?',

                    }

                    ])
                    .then(answers => {

                        var sql = `UPDATE roles  SET id= '${answers.id}', title='${answers.title}', salary='${answers.salary}',department_id='${answers.department_id}' WHERE id='${answers.identifier}'`;
                        connection.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("succesfully stored");
                        });
                        intro()
                    })
                    break;
                case "employees":
                    inquirer
                        .prompt([
                            {
                        
                                type: 'input',
                                name: 'identifier',
                                message: 'What is the employee ID that you want to update?',
    
    
                            },
                            
                            {
                            type: 'number',
                            name: 'id',
                            message: 'What is your employee ID?',

                        },

                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'What is your first name?',

                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'What is your last name?',

                        },
                        {
                            type: 'number',
                            name: 'role_id',
                            message: 'What is your role_id?',
                        },

                        {
                            type: 'number',
                            name: 'manager_id',
                            message: 'What is your manager_id?',
                        },


                        ])
                        .then(answers => {

                            var sql = `UPDATE employees SET id= '${answers.id}', first_name='${answers.first_name}',last_name='${answers.last_name}', role_id='${answers.role_id}',manager_id='${answers.manager_id}' WHERE id='${answers.identifier}'`;
                            connection.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("succesfully stored");
                            });
                            intro()
                        })
                    break;

            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}





