var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var con = mysql.createConnection({
    host: "192.168.28.2",
    user: "agarc_1",
    password: "Nsbc258%",
    database: "agarcia_tabla"
  });
  function comp(){
    var con = mysql.createConnection({
      host: "192.168.28.2",
      user: "agarc_1",
      password: "Nsbc258%",
      database: "agarcia_tabla"
    });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  }
  
  var sql = "INSERT INTO php (nombre) VALUE ('LELE')";
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  }); 
}).listen(8080);

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.28.2",
  user: "agarc_1",
  password: "Nsbc258%",
  database: "agarcia_tabla"
});
function comp(){
  var con = mysql.createConnection({
    host: "192.168.28.2",
    user: "agarc_1",
    password: "Nsbc258%",
    database: "agarcia_tabla"
  });
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
}

var sql = "INSERT INTO php (nombre) VALUE ('LELE')";
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
}); 