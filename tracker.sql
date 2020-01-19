DROP DATABASE IF EXISTS Employee_DB;
CREATE database  Employee_DB;

USE   Employee_DB;

CREATE TABLE department(
  id INT  NOT NULL AUTO_INCREMENT, -- Primary Key
  dept_name VARCHAR(30) NOT NULL, -- hold department name
  PRIMARY KEY (id)
);
-- USE   Employee_DB;  
-- SELECT * FROM department;

-- USE   Employee_DB;
 
CREATE TABLE dep_role(
  id INT  NOT NULL PRIMARY KEY AUTO_INCREMENT, -- Primary Key
  title VARCHAR(30) NOT NULL, -- hold role title
  salary DECIMAL(10, 2) NOT NULL, -- hold role salaries
  dept_id INT  NULL,
  -- ON DELETE (Cascade),
  FOREIGN KEY(dept_id) REFERENCES department(id)   -- hold role title
   
);
-- USE   Employee_DB;
-- SELECT * FROM dep_role;
  
USE   Employee_DB;
CREATE TABLE employee(
  id INT  NOT NULL PRIMARY KEY AUTO_INCREMENT, -- Primary Key
  first_name VARCHAR(30)  NULL, -- hold employee first name
  last_name VARCHAR(30) NOT NULL, -- hold employee last name
  role_id INT NULL ,-- hold reference to role employee has
  manager  VARCHAR(50)  NULL,
  manager_id INT NULL, -- hold reference to another employee that manager of the current employee
  FOREIGN KEY(role_id) REFERENCES dep_role (id),
  FOREIGN KEY(manager_id) REFERENCES employee (id)
);
-- INSERT INTO  employee (first_name, last_name, role_id, manager_first_name, manager_last_name, manager_id) 
 
-- USE   Employee_DB;
-- SELECT * FROM employee;

 

SELECT  emp.id,  emp.first_name, emp.last_name, emp.manager_first_name, 
emp.manager_last_name, rol.Title, rol.Salary, dept.dept_name
FROM employee as emp INNER JOIN dep_role as rol
ON emp.role_id = rol.id
INNER JOIN department as dept 
ON rol.dept_id = dept.id
ORDER BY emp.id