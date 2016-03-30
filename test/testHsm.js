

const assert = require('assert');
const testHsm = require('./testSm2.js').testHsm;


/**
 *  This test suite is meant to be run through gulp (use the `npm run watch`)
 *  script.
 */

describe('Test HSM', function() {

    describe('#constructor', function() {

        const sm = testHsm();

        it('should be initialized to state 111', function() {
            assert.strictEqual(sm.getState(), 111);
        });
        it('should have test variable with string value 0', function() {
            assert.strictEqual(sm.getVar(), "0");
        });

    }); // #constructor


    describe('#methods', function() {

        const sm = testHsm();

    }); // #methods


});
