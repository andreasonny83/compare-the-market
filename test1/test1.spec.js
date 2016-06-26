'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

var test1 = require('./test1');

chai.use(chaiAsPromised);

describe('Test1: Read all the uniques words contained ' +
  'in a text file', function() {
  describe('UAT1: Error cases', function() {
    it('A missing folder, should return an error.', function() {
      return expect(test1('', 'stream')).to.eventually
        .be.rejectedWith('No folder specified.');
    });

    it('A missing folder, should return an error.', function() {
      expect(test1()).to.equal(false);
    });
  });

  describe('UAT2: Read words from file', function() {
    var results;

    before(function() {
      results = test1('test1/mock_tests/test.txt', 'stream');
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

  describe('UAT3: countWords', function() {
    var countWords = test1.countWords('HELLO, world;hello');

    it('Should ignore punctuation', function() {
      expect(Object.keys(test1.countWords('..hello!!:')).length).to.equal(1);

      expect(test1.countWords('..hello!!:')).to.have.property('hello');
      expect(test1.countWords('!hello')).to.have.property('hello');
      expect(test1.countWords('"hello"')).to.have.property('hello');
      expect(test1.countWords('"hello"')).to.have.property('hello');
    });

    it('Should be case insensitive', function() {
      expect(test1.countWords('HELLO')).to.have.property('hello');
      expect(test1.countWords('HeLlO')).to.have.property('hello');
      expect(test1.countWords('Hello')).to.have.property('hello');
    });

    it('Should return only unique words', function() {
      expect(test1.countWords('HELLO, world'))
        .to.have.property('hello');

      expect(test1.countWords('HELLO, world'))
        .to.have.property('world');

      expect(test1.countWords('HELLO, world;hello'))
        .to.have.property('world');

      expect(Object.keys(countWords).length)
        .to.equal(2);
    });

    it('Should count the words in a string', function() {
      expect(test1.countWords('HELL0, world;hello').hello)
        .to.equal(1);

      expect(test1.countWords('HELLO, world;hello').hello)
        .to.equal(2);

      expect(test1.countWords('HELLO, world;hello').hello)
        .to.equal(2);

      expect(test1.countWords('HELLO, world;hello-HELLO').hello)
        .to.equal(3);
    });
  });
});
