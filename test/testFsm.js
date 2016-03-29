

const assert = require('assert');
const testFsm = require('../lib/testSm1.js').testFsm;

//const sm = testFsm();

/**
 *  This test suite is meant to be run through gulp (use the `npm run watch`)
 *  script.
 */

describe('Test FSM', function() {

    describe('#constructor', function() {

        const sm = testFsm();

        it('should be in state 1', function() {
            assert.strictEqual(sm.getState(), 1);
        });
        it('should have test variable with value 0', function() {
            assert.strictEqual(sm.getVar(), 0);
        });
    }); // #constructor


    describe('#methods', function() {

        const sm = testFsm();

        describe('dispatch', function() {
            it('in state1: should react to event 1 (add counter)', function() {
                sm.dispatch({signal: "1"});
                assert.strictEqual(sm.getVar(), 1);
            });
            it('in state1: should react to event 2 (transit to state 2)', function() {
                sm.dispatch({signal: "2"});
                assert.strictEqual(sm.getState(), 2);
            });
            it('in state1: should react to event 2 (add counter)', function() {
                sm.dispatch({signal: "2"});
                assert.strictEqual(sm.getVar(), 2);
            });
            it('in state1: should react to event 1 (transit to state 2)', function() {
                sm.dispatch({signal: "1"});
                assert.strictEqual(sm.getState(), 1);
            });
        });

        /*
        describe('#toJSON', function() {
            it('should have correct values in JSON dump', function() {
                var jsonData = item.toJSON()
                assert.strictEqual(jsonData.id, (0x0102 << 16) + 0x0B0C);
                assert.equal(jsonData.date.valueOf(), refDate.valueOf());
                //assert.equal(jsonData.expirationDate.valueOf(), refDate2.valueOf());
                assert(jsonData.data);
            });
        });
        */
  }); // #methods


});
