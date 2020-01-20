var mysql = require("mysql");
var inquirer = require("inquirer");
const console_table = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "2020@Sile",
  database: "Employee_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  manageEmployee();
});

function manageEmployee() {
  inquirer
    .prompt({
      name: "answer",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "View Departments",
        "Add role",
        "View roles",
        "Update Employee Role",
        "Add employee",
        "View Employees roles and departments",
        "Remove Employee",
        "Exit"
      ]
    })
    .then(function (data) {
      switch (data.answer) {
        case "Add department":
          addDepartment();
          break;

        case "View Departments":
          viewDeptments();
          break;

        case "Add role":
          addEmplRole();
          break;

        case "View roles":
          viewAllRoles();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View Employees":
          viewAllEmployee();
          break;
        case "View Employees roles and departments":
          viewEmployees();
          break;
        case "Remove Employee":
          deleteEmployee()
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
//Function to add Employee department
function addDepartment() {
  inquirer
    .prompt({
      name: "dept",
      type: "list",
      message: "What's the employee department?",
      choices: [
        "Accounting",
        "Humain Resources",
        "Admin",
        "Information Technology",
        "Finance",
        "Customer Service",
        "Cafetaria",
        "Sales",
        "Retail",
        "Exit"
      ]
    }).then(function (answer) {
      console.log(answer)
      connection.query(
        "INSERT INTO department SET ?",
        { dept_name: answer.dept, },
        function (err, res) {
          if (err) throw err;
          console.log("Your new employee has been added!", res);
          viewDeptments();
        })
    });
}
//Function to view departments
function viewDeptments() {
  console.log("Selecting all Departments...\n");
  connection.query(
    "SELECT * FROM department", function (err, res) {
      if (err) throw err;
       
      console.log(res);
      connection.end()
    });
}
//Function to add Employee Role
function addEmplRole() {
  inquirer
    .prompt([

      {
        name: "salary",
        type: "input",
        message: "What's the employee Salary?"
      },
      {
        name: "dept_id",
        type: "input",
        message: "What's the employee dept_id?"
      },

      {
        name: "title",
        type: "list",
        message: "What's the Employee role?",
        choices: [
          "Project manager",
          "Business Analyst",
          "QA Tester",
          "Software Developer",
          "Database Analyst",
          "Custmomer Servce Agent",
          "Sevicing Manager",
          "Cashier",
          "Bank Teller",
          "Accountant",
          "Exit"

        ]
      },

    ]).then(function (answer) {
      console.log(answer)
      connection.query(
        "INSERT INTO dept_role SET ?",
        { title: answer.title, salary: answer.salary, dept_id: answer.dept_id },
        function (err, res) {
          if (err) throw err;
          console.log("Your employee  role has been added!", res);
          viewAllRoles()
        })
    });
}

//Function to view all  Employees Role
function viewAllRoles() {
  console.log("Selecting all Departments...\n");
  connection.query(
    "SELECT * FROM dept_role", function (err, res) {
      if (err) throw err;
       
      console.log(res);
      connection.end()
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "fname",
        type: "input",
        message: "What's the employee first name?"
      },
      {
        name: "lname",
        type: "input",
        message: "What's the employee last name?"
      },
      {
        name: "manager",
        type: "list",
        message: "Who's the Employee Manager?",
        choices: [
          "Jon Jack",
          "Bob Knoeig",
          "Jack Black",
          "Susan Mode",
          "Jose Diplome",
          " Julie Mark",
          "Sile Kiman",
          "Exit"
        ]
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the Employee's role id ?"
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter the manager's id ?"
      },

    ]).then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fname,
          last_name: answer.lname,
          role_id: answer.role_id,
          manager: answer.manager,
          manager_id: answer.manager_id,
        }, function (err, res) {
          if (err) throw err;
          console.log("Your new employee has been added!");
          viewEmployees()
          console.log(res)

        }
      )
    });
}


function viewEmployees() {
  console.log("Selecting all Employee...\n");
  connection.query(
    "SELECT emp.id,  emp.first_name, emp.last_name, emp.manager, emp.manager_id, rol.Title, rol.Salary, dept.dept_name FROM employee as emp INNER JOIN dept_role as rol ON emp.role_id = rol.role_id INNER JOIN department as dept ON rol.dept_id = dept.dept_id ORDER BY emp.id", function (err, res) {
      if (err) throw err;
       console.log(res);
      connection.end()

    });
}

//Function to view all Employee
function viewAllEmployee() {
  console.log("Selecting all Departments...\n");
  connection.query(
    "SELECT * FROM employee", function (err, res) {
      if (err) throw err;
       console.log(res);
     });
}

//Function to update an Employee Role
function updateEmpRole() {
  inquirer
    .prompt([
      {
        name: "fname",
        type: "input",
        message: "What's the employee first name?"
      },
      {
        name: "role_id",
        type: "input",
        message: "What's the employee New Role ID?"
      },
    ]).then(function (answer) {
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: answer.role_id,
          },

          {
            first_name: answer.fname,

          }], function (err, res) {
            // var err = "Please enter a vlaid role id"
            if (err) throw err;
            console.log("Your new employee has been added!");
            viewEmployees()
            console.log(res)

          }
      )
    });
}

//Function to update an Employee Role
function deleteEmployee() {
  inquirer
    .prompt([

      {
        name: "emp_id",
        type: "input",
        message: "What's the employee ID?"
      },
    ]).then(function (answer) {
      connection.query(
        "DELETE FROM employee WHERE ?",
        { id: answer.emp_id }

        , function (err, res) {
           if (err) throw err;
          console.log("Your new employee has been added!");
          viewEmployees()
          console.log(res)

        }
      )
    });
}


