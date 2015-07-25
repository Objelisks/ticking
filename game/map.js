var makeBox = function(tiles, x, y, width, height) {

  for(var k=0; k<height; k++) {
    tiles[k+y] = {};
    for(var j=0; j<width; j++) {
      tiles[k+y][j+x] = {
        x: j+x,
        y: k+y,
        char: (j==0 || k==0 || j==width-1 || k==height-1) ? '#' : ',',
        color: (j==0 || k==0 || j==width-1 || k==height-1) ? '#adb' : '#453',
      };
    }
  }
}

var Map = function() {
  this.tiles = {};
  this.items = {};
  makeBox(this.tiles, 3, 3, 20, 18);
}

Map.prototype.draw = function(display) {
  var self = this;
  Object.keys(self.tiles).forEach(function(row) {
    Object.keys(self.tiles[row]).forEach(function(col) {
      var tile = self.tiles[row][col];
      display.draw(tile.x, tile.y, tile.char, tile.color);
    });
  });
  Object.keys(this.items).forEach(function(cell) {
    self.items[cell].forEach(function(item) {
      item.draw(display);
    });
  });
}

Map.prototype.addItem = function(item) {
  var cell = item.x + '_' + item.y;
  if(!this.items[cell]) {
    this.items[cell] = [];
  }

  this.items[cell].push(item);
}

exports.Map = Map;
