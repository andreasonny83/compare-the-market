var fs = require('fs');
var remaining = '';
var uniqueWords = {};

/**
 * Count the unique words contained in the file stream
 * and store them in the uniqueWords Object
 *
 * @param  {Object} line  The chunk file coming from the read stream
 *
 * @return {[type]}      [description]
 */
function countWords(line) {
  var words;
  var word;
  var i;

  words = line.match(/(?!\d)(\w+\b)(?!.*\1)/g, '');

  for (i = 0; words ? i < words.length : 0; i++) {
    word = words[i].toLowerCase();

    uniqueWords[word] = uniqueWords[word] ?
      uniqueWords[word] += 1 : 1;
  }
}

/**
 * Sort the result and render the list on the screen
 *
 * @param  {Object} results   The unique words object
 */
function printResult(results) {
  var keysSorted = Object.keys(results)
        .sort(function(a, b) {
          return results[a] - results[b];
        });

  return keysSorted.forEach(function(val) {
    return val, results[val];
  });
}

/**
 * Read each text file inside the target dyrectory
 *
 * @param  {String} dirname   The name of the subfolder
 */
function readDir(dirname) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log('error:', err);
      return;
    }

    var readStream;

    filenames.forEach(function(filename) {
      readStream = fs.createReadStream(
        [dirname, filename].join('/'),
        {encoding: 'utf8', bufferSize: 1024}
      );

      readStream.on('data', function(chunk) {
        var index = remaining.indexOf('\n');
        var line;

        remaining += chunk;

        while (index > -1) {
          line = remaining.substring(0, index);
          remaining = remaining.substring(index + 1);
          countWords(line);
          index = remaining.indexOf('\n');
        }
      });

      readStream.on('end', function() {
        if (remaining.length > 0) {
          countWords(remaining);
        }

        return printResult(uniqueWords);
      });
    });
  });
}



module.exports = readDir;
