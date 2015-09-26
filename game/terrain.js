var alea = new Alea(1004);
var simplex = new SimplexNoise(alea);

Array.prototype.lerp = function(x) {
    return this[Math.floor(x*this.length)];
}

var grassyPlainsSprites = ['.',',','`','"'];
var grassyPlainsPalette = [[100,105,32], [105,114,18]];

var generateTerrain = function(x, y) {
    var val = (simplex.noise2D(x/10.0, y/10.0)+1.0)/2.0;
    var img = grassyPlainsSprites.lerp(val);
    var fg = ROT.Color.interpolate(grassyPlainsPalette[0], grassyPlainsPalette[1], val);
    var bg = ROT.Color.interpolate(fg, [0,0,0], 0.25);
    return {img: img, fg: ROT.Color.toRGB(fg), bg: ROT.Color.toRGB(bg) };
}
