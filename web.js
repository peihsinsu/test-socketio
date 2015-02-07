/**
 * Socket server
 * file: web.js
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
 
server.listen(8000);
 
app.get('/jquery.js', function (req, res) {
  res.sendfile(__dirname + '/bower_components/jquery/src/jquery.js');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
 
var prefix = 'room';

io.set('heartbeat interval', 50);
io.on('connection', function (socket) {
	//console.log(socket.manager.settings);
	room = prefix + "-" + new Date().getTime();
	socket.join(room);
  
	if(process.argv[2] == 'loop') 	
  var loop = setInterval(function(){
		doit();
  }, 3000);

  function doit() {
		var ts = new Date().getTime();
	  io.sockets.in(room).emit('roomevent', {room: room, ts: ts, msg: 'sent to room...'})
	}

	socket.on('event1', function (data) {
    console.log(data);
  });

	socket.on('disconnect', function(){
		console.log('client disconnected...');
		if(loop) clearInterval(loop);
	});

});
