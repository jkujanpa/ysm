"use strict"

const YSM_UNHANDLED = 0;
const YSM_HANDLED = 1;
const YSM_TRANSFER = 2;

function yEvent(spec) {
    const signal = spec.signal;
    const data = spec.data;

    return Object.freeze({
        signal,
        data
    });
}


function yState(spec) {
    const name = spec.name || "no_name";
    const parent = (typeof spec.parent === 'undefined')
        ? top
        : spec.parent;
    const handler = spec.handler;
    const init = spec.init || function() { return YSM_HANDLED; };
    const entry = spec.entry || function() { return YSM_HANDLED; };
    const exit = spec.exit || function() { return YSM_HANDLED; };

    return Object.freeze({
        name,
        parent,
        handler,
        init,
        entry,
        exit
    });
}

var top = yState({
    handler: function() {
        return YSM_HANDLED;
    }
});



function yHsm() {
    let currentState = top;
    let targetState = top;

    function init(initial) {
        // Set target state
        targetState = initial;

        // Find path from target state to current current state
        do {
            let path = [];
            let state = targetState;
            // Store pathfrom target to current state
            while (state !== currentState) {
                path.push(state);
                state = state.parent;
            }
            // Call entry functions to all states in path
            for (let i = path.length -1; i>=0; i--) {
                path[i].entry();
            }

            // Set current state as target
            currentState = targetState;
        }
        // Check initial state for current state (stored in targetState)
        while (currentState.init() === YSM_TRANSFER)
    };

    function transfer(state) {
        targetState = state;
        return YSM_TRANSFER;
    };

    function dispatch(event) {
        let ret;
        let s = currentState;

        ret = s.handler(event);
        while (ret === YSM_UNHANDLED) {
            s = s.parent;
            ret = s.handler(event);
        }

        return 0;
    };

    function isIn(state) {
        let c = currentState;

        while (c !== top) {
            if (c === state) {
                return true;
            }
            c = c.parent;
        }
        return false;
    };


    function isIn2(state) {
        let c = currentState;
        if (c === top) {
            return false;
        }
        if (c === state) {
            return true;
        }
        return isIn2(c.parent);
    };

    /*
    function factor(n) {
        if (n === 1) {
                return 1;
        }
        return factor(n-1)*n;
    };
    console.log(factor(100));
    */


    return Object.freeze({
        init,
        dispatch,
        transfer,
        isIn,
        isIn2
    });
}


yHsm.top = top;

module.exports.yEvent = yEvent;
module.exports.yState = yState;
module.exports.yHsm = yHsm;




const testSm = function() {

    const sm = yHsm();
    const dispatch = sm.dispatch;

    const state1 = yState({
        name: "state1",
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state1:1");
                return YSM_HANDLED;
            case "2":
                console.log("state1:2");
                return sm.transfer(state2);
            case "3":
                console.log("state1:3");
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
        },
        exit(event) {
            console.log("EXIT state1");
        }
    });

    const state11 = yState({
        name: "state11",
        parent: state1,
        handler(event) {
            switch (event.signal) {
            case "1":
                console.log("state11:1");
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
        },
        exit(event) {
            console.log("EXIT state11");
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
        },
        exit(event) {
            console.log("EXIT state111");
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
                return YSM_HANDLED;
            case "3":
                console.log("state2:3");
                return YSM_HANDLED;
            }
            return YSM_UNHANDLED;
        },
        init(event) {
            console.log("INIT state11");
        },
        entry(event) {
            console.log("ENTRY state2");
        },
        exit(event) {
            console.log("EXIT state2");
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
                return YSM_HANDLED;
            }
            return YSM_UNHANDLED;
        },
        init(event) {
            console.log("INIT state22");
        },
        entry(event) {
            console.log("ENTRY state22");
        },
        exit(event) {
            console.log("EXIT state22");
        }
    });

    sm.init(state1);

    console.log(sm.isIn(state1));
    console.log(sm.isIn2(state1));
    console.log(sm.isIn(state2));
    console.log(sm.isIn2(state2));

    return Object.freeze({
        dispatch
    });
}


var sm = testSm();

sm.dispatch({signal: "1"});
sm.dispatch({signal: "3"});
sm.dispatch({signal: "2"});

sm.dispatch({signal: "2"});
sm.dispatch({signal: "3"});
sm.dispatch({signal: "1"});
