'use strict';

var chai = require('chai');
var expect = chai.expect;

var test2 = require('./bowling');

describe('Test2: Bowling', function() {
  describe('Function: calcFrame', function() {
    it('A strike should return 10', function() {
      expect(test2.calcFrame('X')).to.equal(10);
    });

    it('A spare should return 10', function() {
      expect(test2.calcFrame('6/')).to.equal(10);
      expect(test2.calcFrame('1/')).to.equal(10);
      expect(test2.calcFrame('-/')).to.equal(10);
    });

    it('A null bonus should return 0', function() {
      expect(test2.calcFrame('-')).to.equal(0);
    });

    it('A frame should return the total of the two tries', function() {
      expect(test2.calcFrame('6-')).to.equal(6);
      expect(test2.calcFrame('-6')).to.equal(6);
      expect(test2.calcFrame('--')).to.equal(0);
      expect(test2.calcFrame('61')).to.equal(7);
      expect(test2.calcFrame('12')).to.equal(3);
      expect(test2.calcFrame('9/')).to.equal(10);
    });

    it('A wrong formatted frame should return 0', function() {
      expect(test2.calcFrame('0')).to.equal(0);
      expect(test2.calcFrame('1X')).to.equal(0);
      expect(test2.calcFrame('X1')).to.equal(0);
      expect(test2.calcFrame('X-')).to.equal(0);
      expect(test2.calcFrame('-X')).to.equal(0);
      expect(test2.calcFrame('91')).to.equal(0);
      expect(test2.calcFrame('03')).to.equal(0);
      expect(test2.calcFrame('30')).to.equal(0);
      expect(test2.calcFrame('/3')).to.equal(0);
    });
  });

  describe('Function: getFrames', function() {
    var result;

    it('A wrong formatted frame should return 0', function() {
      expect(test2.getFrames()).to.equal(false);

      expect(test2.getFrames('01|XXX|X|X|X|X|X|X|X|/||X'))
        .to.equal(false);

      expect(test2.getFrames('-1|X/|X|X|X|X|X|X|X|/||XXX'))
        .to.deep.equal(false);

      expect(test2.getFrames('-11|X/|X|X|X|X|X|X|X|/||XXX'))
        .to.deep.equal(false);

      expect(test2.getFrames('-11|X/|X|X|X|X|X|X|X|/|XXX'))
        .to.deep.equal(false);

      expect(test2.getFrames('-11|X/|X|X|X|X|X|X|X|/XXX'))
        .to.deep.equal(false);
    });

    it('Test game scenarios', function() {
      result = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
      expect(test2.getFrames('X|X|X|X|X|X|X|X|X|X||XX')).to.deep.equal(result);

      result = ['--', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '1/', 'X'];
      expect(test2.getFrames('--|X|X|X|X|X|X|X|X|1/||X')).to.deep.equal(result);

      expect(test2.getFrames('01|X|X|X|X|X|X|X|X|/||X')).to.deep.equal(false);

      expect(test2.getFrames('-1|X/|X|X|X|X|X|X|X|X/||X')).to.deep.equal(false);

      result = ['11', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '1/', 'X'];
      expect(test2.getFrames('a1|XX|X|X|X|X|X|X|X|1/||X')).to.deep.equal(false);
      expect(test2.getFrames('11|X|X|X|X|X|X|X|X|1/||X')).to.deep.equal(result);
    });
  });

  describe('Function: calcScore', function() {
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    var game = new test2();

    it('Calling with a missing frames should return false', function() {
      expect(test2.calcScore()).to.equal(false);
    });

    it('A winning game should return 300', function() {
      game._frames = [
        'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'
      ];

      expect(test2.calcScore(game)).to.equal(300);
    });

    it('A losing game should return 0', function() {
      game._frames = [
        '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'
      ];

      expect(test2.calcScore(game)).to.equal(0);
    });

    it('Test other scenarios', function() {
      game._frames = [
        '-1', '-1', '-1', '-1', '-1', '-1', '-1', '1-', '1-', '1-'
      ];
      expect(test2.calcScore(game)).to.equal(10);

      game._frames = [
        '21', '-1', '-1', '-1', '-1', '-1', '-1', '1-', '1-', '1-'
      ];
      expect(test2.calcScore(game)).to.equal(12);

      game._frames = [
        '2/', '-1', '-1', '-1', '-1', '-1', '-1', '1-', '1-', '1-'
      ];
      expect(test2.calcScore(game)).to.equal(19);

      game._frames = [
        '2/', '-1', '-1', '-1', '-1', '-1', '-1', '1-', '1-', 'X', '-', '-'
      ];
      expect(test2.calcScore(game)).to.equal(28);

      game._frames = [
        '2/', '-1', '-1', '-1', '-1', '-1', '-1', '1-', '1-', '2/', '1'
      ];
      expect(test2.calcScore(game)).to.equal(29);

      game._frames = [
        '2/', '-1', '-1', '-1', '-1', '-1', '-1', '1-', '1-', '2/', 'X'
      ];
      expect(test2.calcScore(game)).to.equal(38);
    });
  });

  describe('Function: Bowling', function() {
    var game = new test2();

    it('A wrong formatted frame should return false', function() {
      expect(game.score()).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|--|--||1-')).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|--|--||1')).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|--|-||')).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|-|-||211')).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|-|-/||211')).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|-|X||')).to.equal(false);
      expect(game.score('X-|X|X|X|X|X|X|X|X|X||XX')).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|--|-/||')).to.equal(false);
      expect(game.score('X|9-|X|X|X|X|X|X|--|X||')).to.equal(false);
    });

    it('Valid scenarios scoud return a valid result', function() {
      expect(game.score('X|X|X|X|X|X|X|X|X|X||XX')).to.equal(300);
      expect(game.score('X|9-|X|X|X|X|X|X|--|X||11')).to.equal(210);
      expect(game.score('1-|1-|1-|1-|1-|1-|1-|1-|1-|1-||')).to.equal(10);
      expect(game.score('X|9-|X|X|X|X|X|X|--|-/||-')).to.equal(208);
      expect(game.score('--|--|--|--|--|--|--|--|--|-/||-')).to.equal(10);
      expect(game.score('--|--|--|--|--|--|--|--|--|X||--')).to.equal(10);
      expect(game.score('--|--|--|--|--|--|--|--|--|--||')).to.equal(0);
    });
  });
});
