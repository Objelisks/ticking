var Camera = function(display) {
  this.x = 0;
  this.y = 0;
  this.display = display;
}

Camera.prototype.draw = function(x, y, char, fg, bg) {
  this.display.draw(x-this.x, y-this.y, char, fg, bg);
}

exports.Camera = Camera;
