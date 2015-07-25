var Network = require('network.js');
var Actions = require('actions.js');

var Input = function() {
  this.currentAction = null;
}

Input.prototype.update = function(target) {
  if(this.currentAction) {
    this.currentAction(target);
    Network.events.trigger('localaction', this.currentAction);
    this.currentAction = null;
  }
}



//var keyinput = document.createElement("input");
//keyinput.focus();

var LocalInput = function() {
  document.body.addEventListener("keydown", this.keydown.bind(this));
}

LocalInput.prototype = Object.create(Input.prototype);

LocalInput.prototype.keydown = function(e) {
  e.preventDefault();

  switch(e.keyCode) {
    case ROT.VK_UP:
      this.currentAction = Actions.move({x:0, y:-1});
      break;
    case ROT.VK_DOWN:
      this.currentAction = Actions.move({x:0, y:1});
      break;
    case ROT.VK_LEFT:
      this.currentAction = Actions.move({x:-1, y:0});
      break;
    case ROT.VK_RIGHT:
      this.currentAction = Actions.move({x:1, y:0});
      break;
  }
}


var NetInput = function() {

}

NetInput.prototype = Object.create(Input.prototype);

exports.LocalInput = LocalInput;
exports.NetInput = NetInput;
