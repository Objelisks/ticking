var Item = function(x, y) {
  this.name = "a thing";
  this.char = "*";
  this.color = "#b11";
  this.x = x;
  this.y = y;
}

Item.prototype.draw = function(display) {
  display.draw(this.x, this.y, this.char, this.color);
}

exports.Item = Item;
