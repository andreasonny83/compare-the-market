var fs = require('fs');
var remaining = '';
var totWords = {};

function countWords(line) {
  var words = line.split(' ');
  var word;

  for (var i = 0; i < words.length; i++) {
    word = words[i].replace(/^[\'\.\,\;\:\"\!\_\s\d]+|[\'\.\,\;\:\"\!\_\?\s]+$/g, '');
    // word = word.replace(/('s)$/, '');
    // word = words[i];

    // exclude empty lines
    if (!words[i].length) {
      continue;
    }

    if (totWords[word]) {
      totWords[word].count += 1;
    } else {
      totWords[word] = {count: 1};
    }

    // console.log(word);
  }
}

// var input = fs.createReadStream('lines.txt');
var readStream = fs.createReadStream(
  'test_files/Railway-Children-by-E-Nesbit.txt',
   {
     encoding: 'utf8'
    //  bufferSize: 64 * 1024
   }
 );


// readLines(input, func);

readStream.on('data', function(chunk) {
  remaining += chunk;
  var index = remaining.indexOf('\n');
  while (index > -1) {
    var line = remaining.substring(0, index);
    remaining = remaining.substring(index + 1);
    countWords(line);
    index = remaining.indexOf('\n');
  }
});

readStream.on('end', function() {
  if (remaining.length > 0) {
    countWords(remaining);
  }

  console.log(totWords);
});
