var countUniqueWords = require('./test1');

countUniqueWords('test1/test1_files').then(function(result) {
  console.log(result);
}, function(err) {
  console.log(err);
});
