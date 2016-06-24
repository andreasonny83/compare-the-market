var expect = require('chai').expect;
var isPrime = require('./is-prime');

describe('isPrime: read a number and return true if ' +
  'it is a prime number', function() {
  describe('Failing scenrios', function() {
    it('Given: No number provided, Should return `false`', function() {
      expect(isPrime()).to.equal(false);
    });

    it('Given 0: No number provided, Should return `false`', function() {
      expect(isPrime(0)).to.equal(false);
    });

    it('Given: a number less than 2, Should return `false`', function() {
      expect(isPrime(1)).to.equal(false);
    });

    it('Given: some not prime numbers, Should return `false`', function() {
      expect(isPrime(4)).to.equal(false);
      expect(isPrime(8)).to.equal(false);
      expect(isPrime(12)).to.equal(false);
      expect(isPrime(16)).to.equal(false);
      expect(isPrime(18)).to.equal(false);
    });
  });

  describe('Happy scenrios', function() {
    it('Given: 2, Should return `true`', function() {
      expect(isPrime(2)).to.equal(true);
    });

    it('Given: some prime numbers, Should always return `true`', function() {
      expect(isPrime(2)).to.equal(true);
      expect(isPrime(3)).to.equal(true);
      expect(isPrime(5)).to.equal(true);
      expect(isPrime(7)).to.equal(true);
      expect(isPrime(113)).to.equal(true);
    });
  });
});
