var log = require('nodeutil').logger.getInstance('test');
var mode = process.env.MODE || 'test';
var socket_host = {
	  test: 'http://127.0.0.1:8000/',
}[mode];

var io = require('socket.io-client');
var opts = { reconnect: true, connect_timeout: 5000 };

var socket = io.connect(socket_host, opts);
socket.on('connect', function(){
	log.info('connected...');

	if(process.argv[2] == 'loop')
	var loop = setInterval( function() {
		log.info('[%s]client emit event...', new Date());
		socket.emit('event1', {
			msg: 'test...', dt: new Date()
		});
	}, 3000);


socket.on('news', function(data){
	log.info('got news:', data);
});

socket.on('roomevent', function(data){
	var id = socket.io ? socket.io.engine.id : socket.socket.sessionid;
	log.info('[%s][%s]got news:', id, new Date().toString(), data);
});

socket.on('reconnect', function(){
	log.info('[%s]got reconnect event...', new Date().toString());
});

socket.on('disconnect', function(){
	log.info('[%s]got disconnect event...', new Date().toString());
	if(loop) clearInterval(loop);
});

});

