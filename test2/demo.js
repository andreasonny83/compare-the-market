'use strict';

const Bowling = require('./bowling');

var game = new Bowling();

var player1 = game.score('X|X|X|X|X|X|X|X|X|X||XX');
var player2 = game.score('X|9-|X|X|X|X|X|X|--|X||11');
var player3 = game.score('1-|1-|1-|1-|1-|1-|1-|1-|1-|1-||');

console.log('\nGame1 - Final scores:');
console.log('=====================');
console.log('player1 - Score:', player1);
console.log('player2 - Score:', player2);
console.log('player3 - Score:', player3);
console.log('\n');
