// view all departments
const allDept = `SELECT * FROM department`;

// view all roles
const allRoles = `SELECT roles.id, roles.title,department.department_name
AS department,
roles.salary
FROM roles
LEFT JOIN department
ON roles.department_id = department.id`;

// view all employees
const allEmp = `SELECT emp.id, emp.first_name, emp.last_name, 
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
ON roles.department_id = department.id`;

// add to employees table
const addEmp = `INSERT INTO employee(first_name, last_name ,role_id , manager_id)
VALUES (?,?,?,?)`

// add role into roles table
const addRoles = `INSERT INTO roles(title, salary, department_id)
VALUES (?,?,?)` 

// get role options from table
const theRoleChoice = `SELECT * FROM roles`;

// get department info
const departments = `SELECT * FROM department `

// add departments
const addDept = `INSERT INTO department(department_name)
VALUES(?)`

// update role, by resetting its id, associated with the employee of users choice
const updateRole = `UPDATE employee SET role_id = ?
WHERE id = ?`

module.exports = {allDept, allRoles, allEmp, addEmp, theRoleChoice, addRoles, departments, addDept, updateRole};


