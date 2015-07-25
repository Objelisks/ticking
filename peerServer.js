var io = require('socket.io')(3000);

var conns = {};

io.on('connection', function(socket) {

  socket.on('message', function(data) {
    console.log('recv', socket.id, data);
    if(data.type === 'hello') {
      conns[socket.id] = data;
      socket.send({
        type: 'peers',
        peers: Object.keys(conns).map(function(conn) { return conns[conn].id; })
      });
    }
  });

  socket.on('disconnect', function() {
    console.log('gbye', socket.id);
    delete conns[socket.id];
  });

  socket.send('hello');
});
