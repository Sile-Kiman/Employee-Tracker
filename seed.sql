-- Insert Value into Department column
USE   Employee_DB;  
INSERT INTO department(dept_name) VALUE("Accounting");
INSERT INTO department(dept_name) VALUE("Humain Resources");
INSERT INTO department(dept_name) VALUE("Admin");
INSERT INTO department(dept_name) VALUE("Information Technology");
INSERT INTO department(dept_name) VALUE("Finance");
INSERT INTO department(dept_name) VALUE("Customer Service");
INSERT INTO department(dept_name) VALUE("Cafetaria");
INSERT INTO department(dept_name) VALUE("Sales");
INSERT INTO department(dept_name) VALUE("Retail");
USE   Employee_DB;  
SELECT * FROM department;

-- Insert data into the dept_role table
 USE   Employee_DB;
 INSERT INTO dept_role(Title, Salary, dept_id) VALUE("Project manager", 105000, 4);
 INSERT INTO dept_role(Title, Salary, dept_id) VALUE("Business Analyst", 95000, 4);
 INSERT INTO dept_role(Title, Salary, dept_id) VALUE("QA Tester", 90000, 4);
 INSERT INTO dept_role(Title, Salary, dept_id) VALUE("Software Developer", 120000, 4);
 INSERT INTO dept_role(Title, Salary, dept_id) VALUE("Database Analyst", 100000, 4);
 INSERT INTO dept_role(Title, Salary, dept_id)  VALUE("Custmomer Servce Agent", 50000, 6); 
 INSERT INTO dept_role(Title, Salary, dept_id)  VALUE("Sevicing Manager", 750000, 6);  
 INSERT INTO dept_role(Title, Salary, dept_id)  VALUE("Cashier", 25000, 6);
 INSERT INTO dept_role(Title, Salary, dept_id)  VALUE("Bank Teller", 35000, 6);
 INSERT INTO dept_role(Title, Salary, dept_id)   VALUE("Finance Analyst", 35000, 5);
USE   Employee_DB;
SELECT * FROM dept_role;

-- Insert data into employee table

INSERT INTO employee(first_name, last_name, role_id, manager, manager_id) VALUE("Jose", "Marie", 1, "Richard bleu", 1);
INSERT INTO employee(first_name, last_name, role_id, manager, manager_id) VALUE("Jack", "black", 2, "Roger, Mouton", 2);
 
-- Select all employee by department and by role

USE   Employee_DB;

SELECT  emp.id,  emp.first_name, emp.last_name, emp.manager, 
emp.manager_id, rol.Title, rol.Salary, dept.dept_name
FROM employee as emp INNER JOIN dept_role as rol
ON emp.role_id = rol.role_id
INNER JOIN department as dept 
ON rol.dept_id = dept.dept_id
ORDER BY emp.id
-- WHERE emp.role_id = rol.role_id
 

 UPDATE employee   SET  emp.role_id=2 

 WHERE  emp.first_name ="huh";

USE   Employee_DB;
DELETE  FROM employee  
 
Where emp.id=3
