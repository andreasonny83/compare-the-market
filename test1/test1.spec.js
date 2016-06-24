var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

var test1 = require('./test1');
var mockResult = [
  {word: 'again', repetitions: 1},
  {word: 'everybody', repetitions: 1},
  {word: 'this', repetitions: 1},
  {word: 'is', repetitions: 1},
  {word: 'a', repetitions: 1},
  {word: 'test', repetitions: 1},
  {word: 'file', repetitions: 1},
  {word: 'hello', repetitions: 3}
];

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
    it('Should read a list of words', function() {
      return expect(test1('test1/mock_tests'))
        .to.eventually.deep.equal(mockResult);
    });
  });

  describe('UAT3: use a different encoding', function() {
    it('Should return a differnet result', function() {
      return expect(test1('test1/mock_tests', {encoding: 'hex'}))
        .not.to.eventually.deep.equal(mockResult);
    });
  });
});
