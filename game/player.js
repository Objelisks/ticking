
var Player = function(x, y, id) {
  this.id = id ? id : 'local';
  this.char = '@';
  this.color = '#ddd';
  this.x = x;
  this.y = y;
  this.inv = [];
}

Player.prototype.draw = function(display) {
  display.draw(this.x, this.y, this.char, this.color);
}

Player.prototype.pickup = function(thing) {
  this.inv.push(thing);
}

exports.Player = Player;
