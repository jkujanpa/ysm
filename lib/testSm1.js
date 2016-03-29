"use strict"


const ysm = require('../ysm');
const yFsm = ysm.yFsm;
const yState = ysm.yState;


const testFsm = function() {
    const sm = yFsm();
    const dispatch = sm.dispatch;

    let testState = 0;
    let testVar = 0;

    function getState() {
        return testState;
    };

    function getVar() {
        return testVar;
    };

    const state1 = yState({
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state1:1");
                testVar = 1;
                break;
            case "2":
                console.log("state1:2");
                sm.transfer(state2);
                break;
            }
        },
        entry(event) {
            console.log("ENTRY state1");
            testState = 1;
        },
        exit(event) {
            console.log("EXIT state1");
            testState = 0;
        }
    });

    const state2 = yState({
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state2:1");
                sm.transfer(state1);
                break;
            case "2":
                console.log("state2:2");
                testVar = 2;
                break;
            }
        },
        entry(event) {
            console.log("ENTRY state2");
            testState = 2;
        },
        exit(event) {
            console.log("EXIT state2");
            testState = 0;
        }
    });

    sm.init(state1);

    return Object.freeze({
        dispatch,
        getState,
        getVar
    });
}

module.exports.testFsm = testFsm;
