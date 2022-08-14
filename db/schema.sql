DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

-- role shows as pink, therefore probably built in word, so changed to roles
CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
-- link this department id to the one in the department table
  department_id INTEGER,
  CONSTRAINT fk_dept FOREIGN KEY (department_id) REFERENCES department(id) 
);

CREATE TABLE employee (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
--   link role to table role id 
  role_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
--   COME BACK TO THIS SO IT WILL BE SET TO NULL IF EMPLOYEE HAS NO MANAGER
-- should link to employee id holds ref to manager of this employee id 
  manager_id INTEGER
);

