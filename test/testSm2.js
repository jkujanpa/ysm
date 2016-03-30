"use strict"


const ysm = require('../ysm');
const yHsm = ysm.yHsm;
const yState = ysm.yHState;


const testHsm = function() {
    const sm = yHsm();
    const dispatch = sm.dispatch;

    let testState = 0;
    let testVar = "0";

    function getState() {
        return testState;
    };

    function getVar() {
        return testVar;
    };

    const state1 = yState({
        name: "state1",
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state1:1");
                testVar = "1:1";
                return YSM_HANDLED;
            case "2":
                console.log("state1:2");
                return sm.transfer(state2);
            case "3":
                console.log("state1:3");
                testVar = "1:3";
                return YSM_HANDLED;
            }
            return YSM_UNHANDLED;
        },
        init(event) {
            console.log("INIT state1 ==> state11");
            return sm.transfer(state11);
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

    const state11 = yState({
        name: "state11",
        parent: state1,
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state11:1");
                testVar = "11:1";
                return YSM_HANDLED;
            case "2":
                console.log("state11:2");
                return sm.transfer(state22);
            }
            return YSM_UNHANDLED;
        },
        init(event) {
            console.log("INIT state11");
            return sm.transfer(state111);
        },
        entry(event) {
            console.log("ENTRY state11");
            testState = 11;
        },
        exit(event) {
            console.log("EXIT state11");
            testState = 0;
        }
    });


    const state111 = yState({
        name: "state111",
        parent: state11,
        handler(event) {
            return YSM_UNHANDLED;
        },
        init(event) {
            console.log("INIT state111");
        },
        entry(event) {
            console.log("ENTRY state111");
            testState = 111;
        },
        exit(event) {
            console.log("EXIT state111");
            testState = 0;
        }
    });


    const state2 = yState({
        name: "state2",
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state2:1");
                sm.transfer(state1);
                return 0;
            case "2":
                console.log("state2:2");
                testVar = "2:2";
                return YSM_HANDLED;
            case "3":
                console.log("state2:3");
                testVar = "2:3";
                return YSM_HANDLED;
            }
            return YSM_UNHANDLED;
        },
        init(event) {
            console.log("INIT state11");
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

    const state22 = yState({
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state22:1");
                sm.transfer(state11);
                return 0;
            case "2":
                console.log("state22:2");
                testVar = "22:2";
                return YSM_HANDLED;
            }
            return YSM_UNHANDLED;
        },
        init(event) {
            console.log("INIT state22");
        },
        entry(event) {
            console.log("ENTRY state22");
            testState = 22;
        },
        exit(event) {
            console.log("EXIT state22");
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

module.exports.testHsm = testHsm;
