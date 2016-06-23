var expect = require('chai').expect;

var test1 = require('./test1')('test1_files');

describe('Module: moduleName', function() {
  describe('' +
        '' +
        '', function() {
    it('moduleName(input) ' +
        'should return output.', function() {
      var result = output;

      expect(moduleName(input)).to.deep.equal(result);
    });
  });
});
