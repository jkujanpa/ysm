

const assert = require('assert');
const testHsm = require('./testSm2.js').testHsm;


/**
 *  This test suite is meant to be run through gulp (use the `npm run watch`)
 *  script.
 */

describe('Test HSM', function() {

    describe('#constructor', function() {

        var sm = testHsm();

        it('should be initialized to state 111', function() {
            assert.strictEqual(sm.getState(), 111);
        });
        it('should have test variable with string value 0', function() {
            assert.strictEqual(sm.getVar(), "0");
        });

    });


    describe('#dispatch, signal handling in state hierarchy', function() {

        var sm = testHsm();

        it('signal 3 handeled in state 111', function() {
            sm.dispatch({signal:"3"})
            assert.strictEqual(sm.getVar(), "111:3");
        });
        it('signal 1 handeled in state 11', function() {
            sm.dispatch({signal:"1"})
            assert.strictEqual(sm.getVar(), "11:1");
        });
        it('signal 4 handeled in state 1', function() {
            sm.dispatch({signal:"4"})
            assert.strictEqual(sm.getVar(), "1:4");
        });

    });

    describe('#dispatch, state transfers in state hierarchy', function() {

        var sm = testHsm();

        it('state transfer from state 11 to 22', function() {
            sm.dispatch({signal:"2"})
            assert.strictEqual(sm.getState(), 22);
        });

    });

});
