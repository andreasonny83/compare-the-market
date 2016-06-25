'use strict';

/**
 * The Bowling constructor for the game
 */
function Bowling() {
  this._frames = [];
  this._score = null;
}

/**
 * Filter the game and return the game's frames
 *
 * @param  {String} game  The line of bowling in string format
 *
 * @return {Array}        If the game satisfies the rules,
 *                        returns an array of frames,
 *                        otherwise returns false
 */
Bowling.prototype.getFrames = function(game) {
  game = game || null;

  if (!game) {
    return false;
  }

  var re;
  var frames;

  re = new RegExp(
    ['([\\X]|[\\-\\/\\d]{2})\\|([\\X]|[\\-\\/\\d]{2})\\|',
     '([\\X]|[\\-\\/\\d]{2})\\|([\\X]|[\\-\\/\\d]{2})\\|',
     '([\\X]|[\\-\\/\\d]{2})\\|([\\X]|[\\-\\/\\d]{2})\\|',
     '([\\X]|[\\-\\/\\d]{2})\\|([\\X]|[\\-\\/\\d]{2})\\|',
     '([\\X]|[\\-\\/\\d]{2})\\|([\\X]|[\\-\\/\\d]{2})\\|\\|',
     '([\\X\\-\\/\\d]{1})?([\\X\\-\\/\\d]{1})?'
    ].join(''));

  frames = game.match(re);

  return frames ? frames.filter(function(val, i) {
    return i === 0 ? false : val;
  }) : false;
};

/**
 * [function description]
 *
 * @param  {[type]} frame [description]
 *
 * @return {[type]}       [description]
 */
Bowling.prototype.calcFrame = function(frame) {
  var value = 0;

  // If the frame is a strike
  if (frame.length === 1 && frame === 'X') {
    value = 10;
    return value;
  }

  // If the frame is a bonus and is a number
  if (frame.length === 1 && !isNaN(frame)) {
    value = Number(frame);
    return value;
  }

  // If the frame is not valid
  if (frame.length !== 2 ||
      frame[0] === '/' ||
      frame.indexOf('X') !== -1 ||
      frame.indexOf('0') !== -1) {
    // Error
    return 0;
  }

  // If we are here, the first value could only be a number or a miss
  if (frame[0] !== '-') {
    value = Number(frame[0]);
  }

  // The second value could be either a number, a miss or a spare
  if (!isNaN(frame[1])) {
    value = Number(frame[1]) + value === 10 ? 0 : value + Number(frame[1]);
  } else if (frame[1] === '/') {
    value = 10;
  }

  return value;
};

/**
 * [function description]
 *
 * @param  {[type]} frames [description]
 *
 * @return {[type]}        [description]
 */
Bowling.prototype.calcScore = function() {
  var self = this;
  var result = 0;

  if (!self || !self._frames) {
    return false;
  }

  for (var i = 0; i < 10; i++) {
    if (self._frames[i] === 'X') {
      result += self.calcFrame(self._frames[i + 1]) +
                self.calcFrame(self._frames[i + 2]) +
                10;
    } else if (i === 9 && self._frames[i].indexOf('/') !== -1) {
      result += 10 + self.calcFrame(self._frames[i + 1]);
    } else {
      result += self.calcFrame(self._frames[i]);
    }
  }

  return result;
};

/**
 * [function description]
 *
 * @param  {[type]} game [description]
 *
 * @return {[type]}      [description]
 */
Bowling.prototype.score = function(game) {
  this._frames = this.getFrames(game);

  // Error handler
  try {
    if (!this._frames) {
      throw Error('Missing game information');
    }
    if (this._frames[9] === 'X' && this._frames.length !== 12) {
      throw Error('Wrong game information. 2 bonus shots were expected,' +
        ' instead found ' + (this._frames.length - 10));
    }
    if (this._frames[9].indexOf('/') !== -1 && this._frames.length !== 11) {
      throw Error('Wrong game information. 1 bonus shots was expected');
    }
    if (this._frames.length > 10 &&
        this._frames[9].indexOf('/') === -1 &&
        this._frames[9] !== 'X') {
      throw Error('Wrong game information. No bonus shots were expected');
    }
  } catch (err) {
    // console.error('Error', err.message);
    return false;
  }

  this._score = this.calcScore(this._frames);

  return this._score;
};

module.exports = Bowling;

module.exports.calcFrame = Bowling.prototype.calcFrame.bind();
module.exports.getFrames = Bowling.prototype.getFrames.bind();
module.exports.calcScore = function(val) {
  return Bowling.prototype.calcScore.call(val);
};
