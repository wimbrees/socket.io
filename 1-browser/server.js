// https://www.youtube.com/watch?v=HtzA1sCr5FQ

var WebSocketServer = require('ws').Server;
var http = require('http');
var port = process.env.PORT || 5000;
var server = http.createServer();
server.listen(port);

var ws = new WebSocketServer({
    server: server
});
console.log('websocket server created');

ws.on('connection', function(ws) {
    console.log('websocket connection open!');

    var id = setInterval(function() {
        var message = 'ping from server: ' + new Date();
        ws.send(message, function() {
        });
    }, 5000);

    ws.on('message', function(message) {
        console.log(message);        
    });

    ws.on('close', function() {
        console.log('websocket connection closed');
        clearInterval(id);
    });
});