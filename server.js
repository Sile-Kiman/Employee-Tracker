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
 // runEmployeeQuerry();
});

function runEmployeeQuerry() {
  inquirer
    .prompt({
      name: "answer",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employes",
        "View All Employees",
        "View  Department",
        "View roles",
        "Remove Employee",
        "Update Employee Role",
        "Exit"
      ]
    })
    .then(function (data) {
      switch (data.answer) {
        case "Add department":
          addDepartment();
          break;

          case "View Department":
            viewDeptment();
            break;

        //   case "View All Employees By Manager":
        //     viewEmpbyMng();
        //     break;

        // case "Add Employee":
        //   addEmployee();
        //   break;

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

function addDepartment(){
  inquirer
  .prompt({
      name: "dept",
      type: "list",
      message: "What's the employee department?",
      choices: [
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
        {dept_name: answer.dept,},
      function (err, res) {
        if (err) throw err;
        console.log("Your new employee has been added!" , res);
        // re-prompt the user for if they want to bid or post
        //viewEmployees();
        viewDeptment();
        connection.end();
      })
  });
}

function addEmplRole(){
  inquirer
  .prompt([

    {
      name: "salary",
      type: "input",
      message: "What's the employee Salary?"
    },
    
    {
      name: "title",
      type: "list",
      message: "What's the Employee role?",
      choices: [
        "Project manager",
        "Business Analyst",
        "QA Tester",
        "Developer",
        "UAT Tester",
        "Custmomer Servce Agent",
        "Sevicing Manager",
        "Cashier",
        "Teller",
        "Cook",
        "Exit"

      ]
      },    
      
  ]).then(function (answer) {
   
      console.log(answer)
      connection.query(
        "INSERT INTO dep_role SET ?",
        {title: answer.title, salary: answer.salary},
      function (err, res) {
        if (err) throw err;
        
        console.log("Your new employee has been added!" , res);
        // re-prompt the user for if they want to bid or post
        //viewEmployees();
        //viewDeptment();
        viewRole()
        connection.end();
      })
  });
//}

 
 




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
        name: "salary",
        type: "input",
        message: "What's the employee Salary?"
      },
      {
        name: "dept",
        type: "input",
        message: "What's the employee department?"
      },
      {
        name: "deptID",
        type: "input",
        message: "What's the employee department ID?"
      },
      {
        name: "roleID",
        type: "input",
        message: "What's the employee role ID?"
      },


      {
        name: "title",
        type: "list",
        message: "What's the Employee role?",
        choices: [
          "Project manager",
          "Business Analyst",
          "QA Tester",
          "Developer",
          "UAT Tester",
          "Custmomer Servce Agent",
          "Sevicing Manager",
          "Cashier",
          "Teller",
          "Cook",
          "Exit"

        ]
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
        name: "manger_id",
        type: "input",
        message: "Enter the manager's id ?"
      },

    ])
    .then(function (answer) {

      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fname,
          last_name: answer.lname,
          manager: answer.manager,
          
           
        }
      ),
         connection.query(
          "INSERT INTO dep_role SET ?",
          
          { 
            title: answer.title,
            salary: answer.salary,
            
          }
        ),
        connection.query(
          "INSERT INTO department SET ?",
          
          {
           
            dept_name: answer.dept,
            

          }
        ),function (err) {
          if (err) throw err;
          console.log("Your new employee has been added!");
          // re-prompt the user for if they want to bid or post
          viewDeptment();
          connection.end();
        }
    });
}

function viewEmployees() {
  console.log("Selecting all Employee...\n");
  connection.query(
    "SELECT emp.id,  emp.first_name, emp.last_name, emp.manager_first_name, emp.manager_last_name, rol.Title, rol.Salary, dept.dept_name FROM employee as emp INNER JOIN dep_role as rol ON emp.role_id = rol.role_id INNER JOIN department as dept ON rol.dept_id = dept.dept_id ORDER BY emp.id", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      //connection.end();
    });
}

function viewDeptment() {
  console.log("Selecting all Departments...\n");
  connection.query(
    "SELECT * FROM department", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      //connection.end();
    });
}

//addDepartment()

}

function viewRole() {
  console.log("Selecting all Departments...\n");
  connection.query(
    "SELECT * FROM dep_role", function (err, res) {
      if (err) throw err;
       
      // Log all results of the SELECT statement
      console.log(res);
      //connection.end();
    });
}

//addDepartment()
//addEmplRole()
addEmplRole()

