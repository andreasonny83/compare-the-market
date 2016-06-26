'use strict';
var countUniqueWords = require('./test1');

var mode = process.argv[2] || 'SYNC';

if (mode === 'ASYNC') {
  var async = countUniqueWords('test1/test1_files/test.txt', true);

  async.then(function(result) {
    console.log('\n\nPrinting Async results:\n\n', result);
  }, function(err) {
    console.log(err);
  });
} else if (mode === 'STREAM') {
  var stream = countUniqueWords('test1/test1_files/test.txt', 'stream');

  stream.then(function(result) {
    console.log('\n\nPrinting Async results:\n\n', result);
  }, function(err) {
    console.log(err);
  });
} else {
  var sync = countUniqueWords('test1/test1_files/test.txt');

  console.log('\n\nPrinting Sync results:\n\n', sync);
}
