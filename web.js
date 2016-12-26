/**
 * Socket server
 * file: web.js
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//For clustering socket server
var redis = require('socket.io-redis');
//You can run the redis server: docker run --name myredis -p 6379:6379 -d redis
io.adapter(redis({ host: 'localhost', port: 6379 }));
 
var port = process.argv[2] || process.env.PORT || 8000;
server.listen(port);
console.log('Socket server run on %s', port);
 
app.get('/jquery.js', function (req, res) {
  res.sendfile(__dirname + '/bower_components/jquery/src/jquery.js');
});

app.get('/', function (req, res) {
  // res.sendfile(__dirname + '/index.html');
  res.send('ok');
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
		io.sockets.emit('news', {"data":new Date().getTime()});
  });

	socket.on('disconnect', function(){
		console.log('client disconnected...');
		if(loop) clearInterval(loop);
	});

});
