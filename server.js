const mysql = require('mysql2');
const db = require('./db/connection');
// connect to database
const cTable = require('console.table');

// view all departments
db.query(`SELECT * FROM department`, (err,rows) => {
  console.table(['id', 'department'], rows);
});


// view all roles
db.query(`SELECT roles.id, roles.title,department.department_name
AS department,
roles.salary
FROM roles
LEFT JOIN department
ON roles.department_id = department.id`, (err, rows) => {
  console.table(['id', 'title', 'department', 'salary'],rows);
});

// view all employees
db.query(`SELECT emp.id, emp.first_name, emp.last_name, 
roles.title
AS title,
department.department_name
AS department,
roles.salary
AS salary,
CONCAT (man.first_name,' ', man.last_name) 
AS manager
FROM employee emp
LEFT JOIN employee man ON emp.manager_id = man.id
JOIN roles
ON emp.role_id = roles.id
JOIN department
ON roles.department_id = department.id`, (err, rows) => {
  console.table(['id', 'title', 'department', 'salary','manager'],rows);
});

