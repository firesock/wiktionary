var static = require('node-static'),
  http = require('http'),
  util = require('util'),
  socket = require('socket.io');

var webroot = "./client",
  port = 8000;

var file = new(static.Server)(webroot, {
  cache: 0
});

var app = http.createServer(function(req, res) {
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
        console.log('%s - %s', req.url, res.message);
      }
    });
  });
});

app.listen(port);
var io = socket.listen(app);



io.sockets.on('connection', function (socket) {
  socket.emit('join', {'name': socket.id});

  socket.on('say', function(data) {
	  var clients = io.sockets.clients();
	  for (var i = 0; i < clients.length; i++) {
		  var client = clients[i];
		  client.emit('msg', {name: socket.id, msg: data.msg});
	  }
  });
});
