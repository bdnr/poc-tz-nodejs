
var http = require('http');
var count = 0;

var port = process.env.NODEPORT || '4000',
    dbname = process.env.DBNAME || 'testdb',
    dbhost = process.env.DBHOST || '192.168.0.118',
    dbuid = process.env.DBUID || 'db2inst1',
    dbpw = process.env.DBPASS || 'db234',
    dbport = process.env.DBPORT || '50000';

console.log ("DRIVER=DB2;DATABASE=" + dbname + ";HOSTNAME=" + dbhost + ";UID=" + dbuid + ";PWD=" + dbpw + ";PORT=" + dbport + ";PROTOCOL=TCPIP");

function dbtest() {
//console.log("DB2 - conn open");
var ibmdb = require('ibm_db2');

ibmdb.open("DRIVER=DB2;DATABASE=" + dbname + ";HOSTNAME=" + dbhost + ";UID=" + dbuid + ";PWD=" + dbpw + ";PORT=" + dbport + ";PROTOCOL=TCPIP", function (err, conn) {
	if (err) return console.log(err);
		conn.query('select 1 from sysibm.sysdummy1', function (err, data) {
			if (err) console.log(err);
			//console.log ("DRIVER=DB2;DATABASE=" + dbname + ";HOSTNAME=" + dbhost + ";UID=" + dbuid + ";PWD=" + dbpw + ";PORT=" + dbport + ";PROTOCOL=TCPIP");
			//else {console.log("DB2 data:");
			 //console.log(data);}
				});
		conn.close();
		});

//console.log("DB2 - conn closed");
};

function httpstart() {

http.createServer(function (request, response) {
	
	var hrstart = process.hrtime()
	dbtest();
	var hrend = process.hrtime(hrstart)
	count = count +1;

   	response.writeHead(200, {'Content-Type': 'text/plain'});
   	response.end('Count: ' + count + '\nDB2 connection done\nExec time: ' + hrend[0] + '.' + hrend[1] + ' s\n');
        console.log('Count:' + count + ': DB2 execution time: %d ms', hrend[1] / 1000000)

}).listen(port);

console.log('Server running at: ' + port);
}

httpstart();
