var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

var test1 = require('./test1');

chai.use(chaiAsPromised);

describe('Test1: Read all the uniques words contained ' +
  'in a text file', function() {
  describe('UAT1: Error cases', function() {
    it('A missing folder, should return an error.', function() {
      return expect(test1()).to.eventually
        .be.rejectedWith('No folder specified.');
    });

    it('A wrong folder, should return an error.', function() {
      return expect(test1('abc')).to.eventually
        .be.rejectedWith('no such file or directory');
    });
  });

  describe('UAT2: Read words from file', function() {
    var results;

    before(function() {
      results = test1('test1/mock_tests');
    });

    it('Should read a list of words', function() {
      return results.then(function(val) {
        expect(val).to.have.property('again');
        expect(val).to.have.property('hello');
      });
    });

    it('And each word should havea `repetitions` ' +
        'and a `prime` property', function() {
      return results.then(function(val) {
        expect(val.again).to.have.property('repetitions')
          .and.to.equal(1);

        expect(val.again).to.have.property('prime')
          .and.to.equal(false);
      });
    });

    it('verify that 3 is a prime number', function() {
      return results.then(function(val) {
        expect(val.hello).to.have.property('repetitions')
          .and.to.equal(3);

        expect(val.hello).to.have.property('prime')
          .and.to.equal(true);
      });
    });
  });

  describe('UAT3: test functions', function() {
    it('Function: countWords, Should ignore punctuation', function() {
      console.log(test1);
      var countWords = new test1.countUniqueWords('test1/mock_tests');
    });
  });
});
