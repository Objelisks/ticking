var io = require('socketio');
var BackboneEvents = require('backbone-events-standalone');

var connectedPeers = {};
var events = BackboneEvents.mixin({});

var localPeer = new Peer({key: 'simcg99j3j46lxr'});

var isConnected = function(id) {
  return id === localPeer.id || connectedPeers[id];
}

var broadcast = function(msg) {
  Object.keys(connectedPeers).forEach(function(id) {
    connectedPeers[id].send(msg);
    console.log('sent', id, msg);
  });
}

events.on('localaction', function(action) {
  broadcast({
    id: localPeer.id,
    type: 'action',
    name: action.type,
    data: action.data
  });
});

var handleConn = function(conn) {
  console.log('a friend is calling', conn.peer);

  connectedPeers[conn.peer] = conn;

  conn.on('error', function(msg) {
    console.log("couldn't establish connection", msg);
  });

  conn.on('open', function() {
    events.trigger('new', {x:6, y:9, id:conn.peer});
  });

  conn.on('data', function(data) {
    console.log('recv', data);
    events.trigger(data.type, data);
  });

  conn.on('close', function() {
    delete connectedPeers[conn.peer];
    events.trigger('leave', {id:conn.peer});
  });
}

localPeer.on('open', function(id) {
  console.log('local peer: ' + id);

  var socket = io('ws://localhost:3000');
  socket.on('connect', function() {
    socket.send({
      'id': localPeer.id,
      'type': 'hello',
      'x': 5,
      'y': 7
    });
    socket.on('message', function(data) {
      if(data.type === "peers") {
        data.peers.forEach(function(peer) {
          if(!isConnected(peer)) {
            var conn = localPeer.connect(peer);
            handleConn(conn);
          }
        });
      }
    });
  });

  localPeer.on('connection', function(conn) {
    console.log('conn', conn.peer);
    handleConn(conn);
  });

});

exports.events = events;

/*
  send local peer id to node
  node sends list of peers back
  client picks some reasonable limit and connects to however many they want
*/
