var Player = require('player.js').Player;
var LocalInput = require('input.js').LocalInput;
var Map = require('map.js').Map;
var Camera = require('camera.js').Camera;
var Network = require('network.js');
var Item = require('item.js').Item;
var Actions = require('actions.js');

Object.defineProperty(Object.prototype, 'forEach', {
  value: function(callback) {
    var self = this;
    Object.keys(self).forEach(function(item) { callback(self[item]); });
  }
});

var display = new ROT.Display({width: 80, height: 40});
document.body.appendChild(display.getContainer());

var localPlayer = new Player(5, 7);
var localInput = new LocalInput();
var map = new Map();
var camera = new Camera(display);
map.addItem(new Item(8, 9));

var actors = {};
actors['local'] = localPlayer;

Network.events.on('action', function(action) {
  Actions[action.name](action.data)(actors[action.id]);
});

Network.events.on('new', function(data) {
  var actor = new Player(data.x, data.y, data.id);
  Actions.actor(actor)(actors);
  console.log(actors);
});

Network.events.on('leave', function(data) {
  Actions.actor(data).undo(actors);
});

var render = function() {
  requestAnimationFrame(render);

  localInput.update(localPlayer);

  display.clear();

  map.draw(camera);

  actors.forEach(function(actor) {
    actor.draw(camera);
  });
}

requestAnimationFrame(render);

// map stores items in cell
// player checks map cell


// each turn,
// async player input
// on network player

  /// system for loading new objects from server when encountered from peer with updated version

  /// syncing players
  // whenever a player makes a move, send step number and player input

/*
local moves around a corner
net follows
what if there are no other actors
just a world
no player/player collision

players collect gems
gems give players quests

quest types:
  lead another player into a trap
  gather a group of 6 players
  find a thing
*/

/*
  today:
  generalframework
    player class
    map class
    networking class
    event loop
  playermovement
  networking
  iteminventory
  lighting
  interestingterrain
*/
