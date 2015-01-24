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
io.on('connection', function (socket) {
	room = prefix + "-" + new Date().getTime();
	socket.join(room);
  var loop = setInterval(function(){
    //socket.emit('news', { ts: new Date().toString() });
		var ts = new Date().getTime();
	  io.sockets.in(room).emit('roomevent', {room: room, ts: ts, msg: 'sent to room...'})
    //console.log('>>>', io.sockets.clients(room));
  }, 3000);
  
	socket.on('event1', function (data) {
    console.log(data);
  });

	socket.on('disconnect', function(){
		clearInterval(loop);
	});

});
