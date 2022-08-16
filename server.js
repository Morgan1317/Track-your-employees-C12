
const cTable = require('console.table');
// connect to database
const db = require('./db/connection');
// connect to query inputs
const  {allDept, allRoles, allEmp, addEmp, theRoleChoice, getManagers} = require('./query');
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
      console.log('Update Employee Role');
      break; 
    case 'View All Roles':
      sql = allRoles;
      return runCommand(sql);
    case 'Add Role':
      console.log('Add Role');
      break; 
    case 'View All Departments':
      sql = allDept; 
      return runCommand(sql); 
    case 'Add Departments':
      console.log('Add Departments');
      break;
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
      const roles = rows.map(({ title }) => ({  name: title }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'empRole',
          message: 'What is the employees role?',
          choices: roles
        }
      ])
        // once we have selected the role, push this selected role to the new employee array
      .then(empRole =>{
        const newEmpRole = empRole.role;
        newEmpAdd.push(newEmpRole);
        // add employees manager if the employee has one. Need to map to list of imployees. 
        runCommand(allEmp);
      })
    })
  })
};


function runCommand(sql){
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


