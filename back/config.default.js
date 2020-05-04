const mysql = require('mysql');

const database = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'feedbacktraining',
});

database.connect(function(err){
  if(err) throw err
  console.log('You are connected at MYSQL')
});

module.exports = database;