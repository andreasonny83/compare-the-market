'use strict';

module.exports = function(number) {
  number = number || 0;

  if (number < 2) {
    return false;
  }

  var q = Math.floor(Math.sqrt(number));

  for (var i = 2; i <= q; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};
