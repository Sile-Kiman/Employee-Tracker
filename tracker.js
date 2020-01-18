var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function(err) {
  if (err) throw err;
  runEmployeeQuerry();
});

function runEmployeeQuerry() {
  inquirer
    .prompt({
      name: "answer",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"
      ]
    })
    .then(function(data) {
      switch (data.answer) {
      case "View All Employees":
        viewEmployees();
    //     //break;

    //   case "View All Employees By Department":
    //     viewEmplbyDept();
    //     //break;

    //   case "View All Employees By Manager":
    //     viewEmpbyMng();
    //     break;

    //   case "Add Employee":
    //     addEmployee();
    //     //break;

    //     case "Remove Employee":
    //     removeEmployee();
    //     //break;

    //     case "Update Employee Role":
    //     updateEmplbyRole();
    //     break;

        // case "Update Employee Manager":
        // updateEmplMngr();
        // break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function addEmployee() {
    inquirer
      .prompt([
          
        {
        name: "answer",
        type: "input",
        message: "What's the employee first name?"
       },
       
       {
        name: "answer",
        type: "input",
        message: "What's the employee last name?"
       },

       {
        name: "answer",
        type: "input",
        message: "What's the employee Salary?"
       },

       {
        name: "answer",
        type: "list",
        message: "What's the Employee role?",
        choices: [
          "Project manager",
          "Business Analyst",
          "QA- Tester",
          "Developer",
          "UAT Tester",
          "Custmomer Servce Agent",
          "Sevicing Manager",
          "Exit"
    
         ]
        },

        {
            name: "answer",
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
         }
    ])
      .then(function(answer) {
        
      });
  }

  function viewEmployees() {
        console.log("Selecting all Employee...\n");
        connection.query( 
        "SELECT emp.id,  emp.first_name, emp.last_name, emp.manager_first_name, emp.manager_last_name, rol.Title, rol.Salary, dept.dept_name FROM employee as emp INNER JOIN dep_role as rol ON emp.role_id = rol.role_id INNER JOIN department as dept ON rol.dept_id = dept.dept_id ORDER BY emp.id",function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(res);
          //connection.end();
        });
      }
    
  //}