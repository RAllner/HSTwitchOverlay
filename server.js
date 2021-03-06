
var jsonfile = require('jsonfile')
var express = require('express')
,   app = express()
,   server = require('http').createServer(app)
,   io = require('socket.io').listen(server)
,   conf = require('./config.json');
    require('./node_modules/jquery-csv/src/jquery.csv');

// Webserver
// auf den Port x schalten
server.listen(conf.port);

app.configure(function(){
	// statische Dateien ausliefern
	app.use(express.static(__dirname + '/public'));
});

// wenn der Pfad / aufgerufen wird
app.get('/', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/public/index.html');
});

// wenn der Pfad / aufgerufen wird
app.get('/admin', function (req, res) {
    // so wird die Datei index.html ausgegeben
    res.sendfile(__dirname + '/public/admin.html');
});

app.get('/overview', function (req, res) {
	res.sendfile(__dirname + '/public/overview.html');
});

app.get('/font', function (req, res) {
    // so wird die font ausgegeben
    res.sendfile(__dirname + '/public/fonts/font.ttf');
});



function saveValues (data){
    var file = 'values.json';
    var obj = {nameA: data.nameA, nameB: data.nameB, scoreA: data.scoreA, scoreB: data.scoreB, useA: data.useA, useB: data.useB, picksA: data.picksA,  picksB: data.picksB, bansA: data.bansA, bansB: data.bansB, outA: data.outA, outB: data.outB, overviewShowClasses: data.overviewShowClasses, overviewShowScore: data.overviewShowScore};
   jsonfile.writeFileSync(file, obj)
}

function loadPlayerData() {
    var file = 'playerdata.csv';
    try {
        var csv = fs.readFileSync(file);
        return $.csv.toObjects(csv);
    }
    catch(err) {
        return null;
    }
}

function writePlayerData(data) {
    var file = 'playerdata.csv';
    fs.writeFileSync(file,data);
}


function loadValues() {
    var file = 'values.json';
    try {
        return jsonfile.readFileSync(file);
    } catch(err) {
        return { zeit: new Date(), nameA: "Player A", nameB: "Player B", scoreA: 0, scoreB: 0, useA: [], useB: [], picksA: [],  picksB: [], bansA: [], bansB: [], outA: [], outB: [], source:"server", overviewShowClasses: true, overviewShowScore: false};
    }

}

// Websocket
io.sockets.on('connection', function (socket) {
	// der Client ist verbunden
	var values = loadValues();
	socket.emit('chat', { zeit: new Date(), type: "match_update", nameA: values.nameA, nameB: values.nameB, scoreA: values.scoreA, scoreB: values.scoreB, useA: values.useA, useB: values.useB, picksA: values.picksA,  picksB: values.picksB, bansA: values.bansA, bansB: values.bansB, outA: values.outA, outB: values.outB, source:"server", overviewShowClasses: values.overviewShowClasses, overviewShowScore: values.overviewShowScore});
	// wenn ein Benutzer einen Text senden
	socket.on('chat', function (data) {
		saveValues(data);
		// so wird dieser Text an alle anderen Benutzer gesendet
		io.sockets.emit('chat', { zeit: new Date(), type: "match_update",nameA: data.nameA, nameB: data.nameB, scoreA: data.scoreA, scoreB: data.scoreB, useA: data.useA, useB: data.useB, picksA: data.picksA,  picksB: data.picksB, bansA: data.bansA, bansB: data.bansB, outA: data.outA, outB: data.outB, source: data.source, overviewShowClasses: data.overviewShowClasses, overviewShowScore: data.overviewShowScore});
		console.log('Update an Clients gesendet. Spiel: ' + data.nameA + " vs " + data.nameB + ' | trigger durch '+data.source);
	});
});

// Portnummer in die Konsole schreiben
console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');
