import 'babel-polyfill';
import { assert } from 'chai';

const Encoder = require('../src/encoder');

describe('Encoder', function() {

  describe('addressToHex', function() {
    it('should convert a qtum address', async function() {
      assert.equal(await Encoder.addressToHex('qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy'), 
        '00000000000000000000000017e7888aa7412a735f336d2f6d784caefabb6fa3');
    });

    it('should pad a qtum hex address', async function() {
      assert.equal(await Encoder.addressToHex('17e7888aa7412a735f336d2f6d784caefabb6fa3'), 
        '00000000000000000000000017e7888aa7412a735f336d2f6d784caefabb6fa3');
    });

    it('can handle an address with a hex prefix', async function() {
      assert.equal(await Encoder.addressToHex('0x17e7888aa7412a735f336d2f6d784caefabb6fa3'), 
        '00000000000000000000000017e7888aa7412a735f336d2f6d784caefabb6fa3');
    });

    it('throws if address is undefined', async function() {
      assert.throws(() => Encoder.addressToHex(), Error);
    });
  });

  describe('stringToHex', function() {
    it('should convert a string to hex', async function() {
      const hex = await Encoder.stringToHex('Hello World', 640);
      assert.equal(hex, '48656c6c6f20576f726c64000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
      assert.equal(hex.length, 640);
    });

    it('throws if string is undefined', async function() {
      assert.throws(() => Encoder.stringToHex(undefined, 640), Error);
    });

    it('throws if string is not a String', async function() {
      assert.throws(() => Encoder.stringToHex(12345, 640), Error);
    });

    it('throws if maxCharLen is undefined', async function() {
      assert.throws(() => Encoder.stringToHex('Hello world!'), Error);
    });

    it('throws if maxCharLen is not a Number', async function() {
      assert.throws(() => Encoder.stringToHex('Hello world!', 'abc'), Error);
    });
  });
});
