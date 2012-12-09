var static = require('node-static'),
http = require('http'),
util = require('util'),
socket = require('socket.io');

var webroot = "./client",
port = 8000;

var file = new(static.Server)(webroot, {
	cache: 0
});

function requestHandler(req, res) {
	req.addListener('end', function() {
		file.serve(req, res, function(err, result) {
			if (err) {
				console.error('Error serving %s - %s', req.url, err.message);
				if (err.status === 404 || err.status === 500) {
					file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
				} else {
					res.writeHead(err.status, err.headers);
					res.end();
				}
			} else {
				console.log('%s - %s', req.url, result.message);
			}
		});
	});
}

var app = http.createServer(requestHandler);
var io = socket.listen(app);


io.sockets.on('connection', function (socket) {
	socket.emit('join', {'name': socket.id});

	socket.on('say', function(data) {
		socket.broadcast.emit('msg', {name: socket.id, msg: data.msg});
		socket.emit('msg', {name: socket.id, msg: data.msg});
	});
});

//Work around a bug in socket.io - it delegates old handlers correctly
//but fails to remove them in versions of node.js. See:
// https://github.com/LearnBoost/socket.io/pull/1080
// https://github.com/LearnBoost/socket.io/issues/987
app.removeListener('request', requestHandler);

app.listen(port);
