let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
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