let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proyecto22007'
});
 
connection.connect(function(error) {
    if (error) throw error
    console.log("DB conectada (ONLINE)")
});
 
/* connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
}); */
 
// connection.end();

module.exports = connection