let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'bqdmd5e4wvqxh5ozpcmm-mysql.services.clever-cloud.com',
  user     : 'ue7n7sdy3pvel9cj',
  password : '9O6keGEaKgcAFB35jhUN',
  database : 'bqdmd5e4wvqxh5ozpcmm'
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