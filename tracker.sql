DROP DATABASE IF EXISTS Employee_DB;
CREATE database  Employee_DB;

USE   Employee_DB;

CREATE TABLE department (
  dept_id INT  NOT NULL, --Primary Key
  dept_name VARCHAR(30) NULL, -- hold department name
  PRIMARY KEY (dept_id),
);
-- Insert a set of records.
INSERT INTO department (dept_id, dept_name) VALUES (1,  "Technology");

SELECT * FROM Department;

CREATE TABLE dep_role(
  role_id INT  NOT NULL PRIMARY KEY, --Primary Key
  Title VARCHAR(30) NOT NULL, -- hold role title
  Salary DECIMAL(10, 2) NOT NULL, -- hold role salaries
  dept_id INT NOT NULL,
  FOREIGN KEY(dept_id) REFERENCES department(dept_id)  -- hold role title
  --FOREIGN KEY (dept_id) NULL 
);
INSERT INTO dep_role (role_id, Title, Salary, dept_id) VALUES ( 'Developer', "110,000" );
SELECT * FROM dep_role;

CREATE TABLE employee(
  id INT  NOT NULL PRIMARY KEY, --Primary Key
  first_name VARCHAR(30)  NULL, --hold employee first name
  last_name VARCHAR(30) NULL,-- hold employee last name
  role_id INT NOT NULL FOREIGN KEY REFERENCES dep_role (role_id),-- hold reference to role employee has
  manager_id INT NULL -- hold reference to another employee that manager of the current employee
);
INSERT INTO  employee (id, first_name, last_name, role_id, manager_id) VALUES ( 'Jon', 'Seigle' );
SELECT * FROM employee;