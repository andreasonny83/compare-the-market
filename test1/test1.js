'use strict';

var fs = require('fs');
var isPrime = require('./is-prime');

/**
 * [CountUniqueWords description]
 *
 * @param {String} filepath   The folder containing the documents
 * @param {Object} options    Encoding options. Default is UTF8
 */
function CountUniqueWords(filepath, options) {
  this._filepath = filepath || null;
  this._options = options || {encoding: 'utf8'};
  this._uniqueWords = {};
}

// Read each text file inside the target dyrectory
CountUniqueWords.prototype.readDir = function(resolve, reject) {
  var self = this;
  var remaining = '';

  // If no folder specified, trigger an error and exit
  if (!self._filepath) {
    reject(Error('No folder specified.'));
    return;
  }

  fs.readdir(self._filepath, function(err, filenames) {
    // If the folder doesn't exisit or is not accessible,
    // trigger an error and exit
    if (err) {
      reject(Error(err));
      return;
    }

    var fileIndex = filenames.length;

    // Read all the words in all the files
    filenames.forEach(function(fileName) {
      fs.createReadStream(
        [self._filepath, fileName].join('/'),
        self._options
      )
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
        fileIndex--;

        if (remaining.length > 0) {
          self._uniqueWords = self.countWords(remaining);
        }

        if (!fileIndex) {
          return self.printResult(resolve, reject);
        }
      });
    });
  });
};

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
 * @param  {Object} resolve  The promise to return back
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
  resolve(results);
};

// Default export module
module.exports = function(filepath, options) {
  var countUniqueWords = new CountUniqueWords(filepath, options);

  return new Promise(function(resolve, reject) {
    countUniqueWords.readDir(resolve, reject);
  });
};

// countUniqueWords module
module.exports.countWords = function(words) {
  return CountUniqueWords.prototype.countWords
    .call({_uniqueWords: {}}, words);
};
