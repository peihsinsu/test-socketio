# test-socketio

A simple test with server (web.js) and client (client.js) that implement socket.io...

## Start web

```
$ node web.js
```

Run on special port:

```
$ node web.js 8081
```

### Start client

```
$ node client.js
```

You can loop to emit message like...

```
$ node client.js loop
```

Add config for connect special port... 
Open the client.js and modify the socket_host

```
var socket_host = {
    test: 'http://127.0.0.1:8000/',
    test1: 'http://127.0.0.1:8082/',
    test2: 'http://127.0.0.1:8081/',
    gce: 'http://104.155.230.27:8000/'
}[mode];
```

And set env to use your config...
