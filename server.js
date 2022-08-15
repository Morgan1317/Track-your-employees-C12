const mysql = require('mysql2');
const cTable = require('console.table');
// connect to database
const db = require('./db/connection');
// connect to query inputs
const  {allDept, allRoles, allEmp} = require('./query');
const inquirer= require('inquirer');
const { getMaxListeners } = require('./db/connection');


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
       break;
    case 'Add Employee':
      console.log('Add Employee');
      break; 
    case 'Update Employee Role':
      console.log('Update Employee Role');
      break; 
    case 'View All Roles':
      sql = allRoles;
      break; 
    case 'Add Role':
      console.log('Add Role');
      break; 
    case 'View All Departments':
      sql = allDept; 
      break; 
    case 'Add Departments':
      console.log('Add Departments');
      break;
    default:
      db.end();
  }
  return runCommand(sql);
}

function runCommand(sql){
  db.query(sql, (err,rows) =>{
    if(err){
      console.log(err.message)
    };
    console.table(rows);
    manageCompany();
  });
};

manageCompany();

