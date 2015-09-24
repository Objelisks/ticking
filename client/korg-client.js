var midisocket = io('ws://localhost:5000/');
var _m = {};
for(var i=0; i<64; i++) {
    _m[i] = 0.0;
}

midisocket.on('connect', function() {
    midisocket.send('hi');
    midisocket.on('message', function(message) {
        _m[message.data[1]] = message.data[2] / 127.0;
        if(message.data[1] === 45 && message.data[2] === 127) {
            console.log(_m);
        }
    });
});
