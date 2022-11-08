const mysql= require ("mysql2");
const db = mysql.createConnection(
    {
      host:'127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
  ); 


  module.exports=db