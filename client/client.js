//import rot.js
//import socket.io.js

// code page 437


Array.prototype.each = Array.prototype.forEach;


var camera = {
    x: 0, y: 0,
    width: 80,
    height: 40
};

var display = new ROT.Display({width:camera.width, height: camera.height});
document.body.appendChild(display.getContainer());

var terrainCache = {};

var terrain = {
    get: function(x, y) {
        var cached = null;//terrainCache[x+','+y];
        if(cached) {
            return cached;
        } else {
            var val = generateTerrain(x, y);
            terrainCache[x+','+y] = val;
            return val;
        }
    },
    render: function(display, camera) {
        for(var x=0; x<camera.width; x++) {
            for(var y=0; y<camera.height; y++) {
                var tile = terrain.get(x-camera.x, y-camera.y);
                display.draw(x, y, tile.img, tile.fg, tile.bg);
            }
        }
    }
};
var players = [];
var structures = [];


var localPlayer = {
    x: 5,
    y: 6,
    img: '@',
    fg: 'rgb(240,240,240)',
}

window.addEventListener('keydown', function(e) {
    var key = e.keyCode;
    if(key === ROT.VK_UP) {
        localPlayer.y -= 1;
    } else if(key === ROT.VK_DOWN) {
        localPlayer.y += 1;
    } else if(key === ROT.VK_LEFT) {
        localPlayer.x -= 1;
    } else if(key === ROT.VK_RIGHT) {
        localPlayer.x += 1;
    }
});

players.push(localPlayer);

var tree = {
    x: 9, y: 9,
    width: 3,
    upper: [' ','♣',' ',
            '♣','█','♣'],
    lower: ['','╬',''],
    fg: ['#2a2','#2a2', '#2a2',
            '','#973',''],
    bg: [],
    collision: [0,0,0,0,1,0]
    
}

var swcorner = {
    x: 12, y: 13,
    width: 2,
    upper: [],
    lower: ['║',' ',
          '╚','═'],
    fg: ['#aaa','#aaa','#aaa','#aaa'],
    bg: ['#152','#152','#152','#152'],
    collision: [1,0,1,1]
}

var c = ROT.Color.fromString('#aaa');
ROT.Color.toRGBA = function(c, a) {
    return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')';
}

console.log(ROT.Color.toRGBA(c, 50));

structures.push(tree);
structures.push(swcorner);

var draw = function(display, camera) {
    return {
        player: function(obj) {
            display.draw(obj.x-camera.x+0.002, obj.y-camera.y, obj.img, obj.fg, 'rgba(0,0,0,0)');
        },
        lowerLayer: function(obj) {
            obj.lower.each(function(ch, i) {
                if(ch === '') return;
                display.draw(obj.x-camera.x + i%obj.width, obj.y-camera.y + Math.floor(i/obj.width), ch, obj.fg[i], obj.bg[i]);
            });
        },
        upperLayer: function(obj) {
            obj.upper.each(function(ch, i) {
                if(ch === '') return;
                var alpha = 50;
                var fg = ROT.Color.toRGBA(ROT.Color.fromString(obj.fg[i]), alpha);
                display.draw(obj.x-camera.x + i%obj.width + 0.001, obj.y-camera.y + Math.floor(i/obj.width), ch, fg, 'rgba(0,0,0,0)');
            });
        }
    }
}

var render = function() {
    requestAnimationFrame(render);
    terrain.render(display, camera);
    structures.each(function(structure) { draw(display, camera).lowerLayer(structure); });
    players.each(function(player) { draw(display, camera).player(player); });
    structures.each(function(structure) { draw(display, camera).upperLayer(structure); });
}

render();
