'use strict';

var fs = require('fs');
var isPrime = require('./is-prime');

/**
 * [CountUniqueWords description]
 *
 * @param {String} filepath   The folder containing the documents
 * @param {String} async      The strategy to read the file: sync, async, stream
 * @param {Object} options    Encoding options. Default is UTF8
 */
function CountUniqueWords(filepath, async, options) {
  this._filepath = filepath || null;
  this._options = options || {encoding: 'utf8'};
  this._async = async || false;
  this._uniqueWords = {};
}

/**
 * Count the unique words contained in the file stream
 * and store them in the uniqueWords Object
 *
 * @param  {Object} line          The chunk file coming from the read stream
 *
 * @return {Object} uniqueWords   Return the total unique words
 */
CountUniqueWords.prototype.countWords = function(line) {
  var self = this;
  var uniqueWords = self._uniqueWords || {};
  var words = line.match(/(?!\d)(\w+\b)/g, '');
  var word;
  var i;
  for (i = 0; words ? i < words.length : 0; i++) {
    word = words[i].toLowerCase();

    uniqueWords[word] = uniqueWords[word] ?
      uniqueWords[word] += 1 : 1;
  }

  return uniqueWords;
};

/**
 * Sort the result and render the list on the screen
 *
 * @param  {Object} resolve  The promise, if any, to return back
 *
 * @return {Object} results  The results object
 */
CountUniqueWords.prototype.printResult = function(resolve) {
  var self = this;
  var results = {};
  var keysSorted = Object.keys(self._uniqueWords)
        .sort(function(a, b) {
          return self._uniqueWords[a] - self._uniqueWords[b];
        });

  keysSorted.forEach(function(val) {
    results[val] = {
      repetitions: self._uniqueWords[val],
      prime: isPrime(self._uniqueWords[val])
    };
  });

  // return the promise back with the uniqueWords
  if (self._async) {
    return resolve(results);
  }

  return results;
};

CountUniqueWords.prototype.readLoop = function(data) {
  var self = this;
  var index = data.indexOf('\n');
  var line;

  while (index > -1) {
    line = data.substring(0, index);
    data = data.substring(index + 1);
    self._uniqueWords = self.countWords(line);
    index = data.indexOf('\n');
  }
};

// Read each text file inside the target dyrectory
CountUniqueWords.prototype.readFile = function(resolve, reject) {
  var self = this;

  // If no folder specified, trigger an error and exit
  if (!self._filepath) {
    if (self._async === 'stream') reject(Error('No folder specified.'));
    return false;
  }
  if (self._async === 'stream') {
    // Read all the words using streams of chunk data
    var remaining = '';

    fs.createReadStream(self._filepath, self._options)
      .on('data', function(chunk) {
        var index = remaining.indexOf('\n');
        var line;

        remaining += chunk;

        while (index > -1) {
          line = remaining.substring(0, index);
          remaining = remaining.substring(index + 1);
          self._uniqueWords = self.countWords(line);
          index = remaining.indexOf('\n');
        }
      })
      .on('end', function() {
        if (remaining.length > 0) {
          self._uniqueWords = self.countWords(remaining);
        }

        return self.printResult(resolve, reject);
      });
  } else if (self._async) {
    // Read all the words in asyncronous way
    fs.readFile(
      self._filepath, this._options.encoding,
      function(err, data) {
        if (err) throw err;

        self.readLoop(data);

        return self.printResult(resolve, reject);
      });
  } else {
    // Read the file in sync way
    var data = fs.readFileSync(self._filepath, this._options.encoding);

    self.readLoop(data);

    return self.printResult();
  }
};

// Default export module
module.exports = function(filepath, async, options) {
  async = async || false;

  var countUniqueWords = new CountUniqueWords(filepath, async, options);

  if (async) {
    return new Promise(function(resolve, reject) {
      countUniqueWords.readFile(resolve, reject);
    });
  }

  return countUniqueWords.readFile();
};

// countUniqueWords module
module.exports.countWords = function(words) {
  return CountUniqueWords.prototype.countWords
    .call({_uniqueWords: {}}, words);
};
