'use strict';

var fs = require('fs');

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
          self.countWords(line);
          index = remaining.indexOf('\n');
        }
      })
      .on('end', function() {
        fileIndex--;

        if (remaining.length > 0) {
          self.countWords(remaining);
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
 * @param  {Object} line  The chunk file coming from the read stream
 */
CountUniqueWords.prototype.countWords = function(line) {
  var self = this;

  var words = line.match(/(?!\d)(\w+\b)(?!.*\1)/g, '');
  var word;
  var i;

  for (i = 0; words ? i < words.length : 0; i++) {
    word = words[i].toLowerCase();

    self._uniqueWords[word] = self._uniqueWords[word] ?
      self._uniqueWords[word] += 1 : 1;
  }
};

/**
 * Sort the result and render the list on the screen
 *
 * @param  {Object} resolve  The promise to return back
 */
CountUniqueWords.prototype.printResult = function(resolve) {
  var self = this;

  var keysSorted = Object.keys(self._uniqueWords)
        .sort(function(a, b) {
          return self._uniqueWords[a] - self._uniqueWords[b];
        });

  // return the promise back with the uniqueWords
  resolve(keysSorted.map(function(val) {
    return {
      word: val,
      repetitions: self._uniqueWords[val]
    };
  }));
};

module.exports = function(filepath, options) {
  var countUniqueWords = new CountUniqueWords(filepath, options);

  return new Promise(function(resolve, reject) {
    countUniqueWords.readDir(resolve, reject);
  });
};
