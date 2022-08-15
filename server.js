
const cTable = require('console.table');
// connect to database
const db = require('./db/connection');
// connect to query inputs
const  {allDept, allRoles, allEmp, addEmp, theRoleChoice} = require('./query');
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
       break;
    case 'Add Employee':
      return addEmployee();
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
  runCommand(sql);
}

db.query(theRoleChoice, (err, rows) => {
  if(err){
    console.log(err.message)
  } 
  // roleArray = [];
  // for(let i = 0; rows.length; i++){
  //   let thisRole = rows[i]
  //   roleArray.push(thisRole);
  //   console.log(roleArray[i]);
  // }
  // return(roleArray);
// console.log(rows.length)

})

function addEmployee(){
  db.query(theRoleChoice, (err, rows) => {
    if(err){
      console.log(err.message)
    } 
    return(rows); 
  })
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
    },
    // {
    //   type: 'rawlist',
    //   name: 'empRole',
    //   message: 'what is the employees role',
    //   choices: roleArray
    // }

  ]);
}

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


