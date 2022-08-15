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

module.exports = {allDept, allRoles, allEmp};


