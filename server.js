
const cTable = require('console.table');
// connect to database
const db = require('./db/connection');
// connect to query inputs
const  {allDept, allRoles, allEmp, addEmp, theRoleChoice, addRoles, departments, addDept, updateRole} = require('./query');
const inquirer = require('inquirer');



function manageCompany (){
  inquirer.prompt([
    {
      type: 'list',
      name: 'whatToDo',
      message: 'What would you like to do?',
      choices: ['View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Departments',
      'Quit']
    }
  ])
  .then(({ whatToDo }) => {
      ourChoice(whatToDo);
  });
};

function ourChoice(whatToDo){
  switch(whatToDo){
    case 'View All Employees':
       sql = allEmp;
       return runCommand(sql);
    case 'Add Employee':
      return addEmployee();
    case 'Update Employee Role':
      return updateEmployee();
    case 'View All Roles':
      sql = allRoles;
      return runCommand(sql);
    case 'Add Role':
      return addRole();
    case 'View All Departments':
      sql = allDept; 
      return runCommand(sql); 
    case 'Add Departments':
      return addDepartments();
    default:
      db.end();
  }
}

function addEmployee(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'empFirst',
      message: 'What is the employees first name?',
    },
    {
      type: 'input',
      name: 'empLast',
      message: 'What is the employees last name?'
    }
  ])
  .then(res =>{
    const newEmpAdd = [res.empFirst, res.empLast]
    db.query(theRoleChoice, (err,rows) =>{
      if(err){
        console.log(err.message);
      }
      // map roles from the database by title and id and then use them as the choices in the prompt, so they stay updated with what is in the database
      const roles = rows.map(({ title, id }) => ({  name: title, value: id }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'empRoleId',
          message: 'What is the employees role?',
          choices: roles
        }
      ])
        // once we have selected the role, push this selected roles associated id to the new employee array
      .then(theEmpRole =>{
        const empRoleId = theEmpRole.empRoleId;
        newEmpAdd.push(empRoleId);
        // add employees manager if the employee has one. Need to map to list of employees. 
        db.query(allEmp, (err, mans) => {
          if (err){
            console.log(err);
          }
          // name is concat to match with how we previously show the manager
          const manList = mans.map(({first_name, last_name, id}) => ({ name: first_name + " " + last_name, value: id}))
          inquirer.prompt([
            {
              type: 'list',
              name: 'potManagerId',
              message: 'Who is the employees Manager?',
              choices: manList
            }
          ])
          .then(potManager => {
            // grab managers id from the decision and push to employee array
            const potManagerId = potManager.potManagerId;
            newEmpAdd.push(potManagerId);

            // add the new employee with its params, to add to current list of employees, and add to table. 
            db.query(addEmp, newEmpAdd, (err,rows) => {
              if (err){
                console.log(err.message)
              }
              runCommand(allEmp);
            })
          })
        })
      })
    })
  })
};

function addRole(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'What is the role called?',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the Salary?'
    }
  ])
  .then (res =>{
    const newRole = [res.roleName, res.roleSalary]
    db.query(departments, (err,dept) =>{
      if(err){
        console.log(err.message);
      }

      // map departments from database by name and id
      const depts = dept.map(({ id, department_name}) =>({name: department_name, value:id}));
      inquirer.prompt([
        {
          type: 'list',
          name: 'deptId',
          message: 'What department does the role belong in?',
          choices: depts
        }
      ])
      .then(theChosenRole => {
        const deptId = theChosenRole.deptId;
        newRole.push(deptId);
          // add the new employee with its params, to add to current list of employees, and add to table. 
          db.query(addRoles, newRole, (err,rows) => {
            if (err){
              console.log(err.message)
            }
            runCommand(allRoles)
          })
      })
    })
  })
}

function addDepartments(){
  inquirer.prompt([
    {
      type: 'input',
      name:'deptName',
      message:'What is the name of the department you wish to add?'
    }
  ])
  .then(({deptName}) => {
    console.log(addDept)
    console.log(deptName)
    db.query(addDept, deptName, (err,rows) => {
      if(err){
        console.log(err);
      }
      runCommand(allDept)
    });
  });
};

function updateEmployee(){
  db.query(allEmp, (err,res) =>{
    if(err){
      console.log(err.message)
    }
    const empList = res.map(({id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}));  
    inquirer.prompt([
      {
        type: 'list',
        name: 'empId',
        message: 'Which employee do you wish to update?',
        choices: empList
      },
    ])
    .then (updatedEmp =>{
      const empId = [updatedEmp.empId]
      console.log(empId)
      db.query(theRoleChoice, (err,rows) =>{
        if(err){
          console.log(err.message);
        }
        // map roles from the database by title and id and then use them as the choices in the prompt, so they stay updated with what is in the database
        const roles = rows.map(({ title, id }) => ({  name: title, value: id }));
        inquirer.prompt([
          {
            type: 'list',
            name: 'empRoleId',
            message: 'What is the employees new role?',
            choices: roles
          }
        ])
        .then(theEmpRole =>{
          const empRoleId = theEmpRole.empRoleId;
          empId.push(empRoleId);
          reversed = empId.reverse();
          console.log(reversed)
            db.query(updateRole, reversed, (err,data) =>{
            if(err){
              console.log(err.message);
            }
            runCommand(allEmp)
          })
        })
      })
    })  
  })
};

function runCommand(sql){
  console.log(sql)
  db.query(sql, (err,rows) =>{
    
    if(!sql){
      manageCompany();
    } 
    if(err){
      console.log(err.message)
    };
    console.table(rows);
    manageCompany();
  });
};

manageCompany();


