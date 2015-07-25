var action = function(type, data, act) {
  var ret = act.do;
  ret.type = type;
  ret.data = data;
  ret.undo = act.undo;
  return ret;
}

exports.move = function(data) {
  return action('move', data, {
    do: function(target) {
      target.x += data.x;
      target.y += data.y;
    },
    undo: function(target) {
      target.x -= data.x;
      target.y -= data.y;
    }
  })
};

exports.actor = function(actor) {
  return action('actor', actor, {
    do: function(actorList) {
      actorList[actor.id] = actor;
    },
    undo: function(actorList) {
      delete actorList[actor.id];
    }
  })
};
