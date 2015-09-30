var Alea = require('alea');
var SimplexNoise = require('simplex-noise');
var ROT = require('rot-js');


var alea = new Alea(1004);
var simplex = new SimplexNoise(alea);

Array.prototype.lerp = function(x) {
    return this[Math.floor(x*this.length)];
}

var grassyPlainsSprites = ['.',',','`','"'];
var grassyPlainsPalette = [[100,105,32], [105,114,18]];

var tree = {
    x: 9, y: 9,
    width: 3,
    upper: ['','♣','',
            '','', ''],
    lower: ['','', '',
            '','║',''],
    fg: ['#2a2','#2a2', '#2a2',
            '','#973',''],
    bg: [],
    collision: [0,0,0,0,1,0]

}

var generateTerrain = function(x, y) {
    var val = (simplex.noise2D(x/10.0, y/10.0)+1.0)/2.0;
    var img = grassyPlainsSprites.lerp(val);
    var fg = ROT.Color.interpolate(grassyPlainsPalette[0], grassyPlainsPalette[1], val);
    var bg = ROT.Color.interpolate(fg, [0,0,0], 0.25);
    var structures = [];
    if(val > 0.9) {
      var newTree = Object.create(tree);
      newTree.x = x;
      newTree.y = y;
      structures.push(newTree);
    }
    return {img: img, fg: ROT.Color.toRGB(fg), bg: ROT.Color.toRGB(bg), strs:structures };
}

var generateTrees = function(x, y) {

}

module.exports = generateTerrain;
