var test1 = require('./test1/test1');
// var test2 = require('./test2');

test1('test1_files').then(function(result) {
  console.log(result);
}, function(err) {
  console.log(err);
  // console.log(err);
});
