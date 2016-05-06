"use strict"

const UNHANDLED = 0;
const HANDLED = 1;
const TRANSFER = 2;

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
    const init = spec.init || function() { return HANDLED; };
    const entry = spec.entry || function() { return HANDLED; };
    const exit = spec.exit || function() { return HANDLED; };

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
    name: "Top",
    handler: function() {
        return HANDLED;
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
        while (currentState.init() === TRANSFER)
    };

    function transfer(state) {
        console.log("targetState=%s", state.name);

        targetState = state;

        let commonParent = findCommonParent();

        console.log("commonParent=%s", commonParent.name);

        let s = currentState;

        while (s !== commonParent) {
            s.exit();
            s = s.parent;
        }

        s = targetState;

        let entries = []

        while (s !== commonParent) {
            entries.push(s);
            s = s.parent;
        }

        // do entries
        while (entries.length > 0) {
            s = entries.pop();
            s.entry();
        }



        return TRANSFER;
    };

    function dispatch(event) {
        let ret;
        let s = currentState;

        ret = s.handler(event);
        while (ret === UNHANDLED) {
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

    function findCommonParent(/*current, target*/) {
        let cs = currentState;
        let ts = targetState;

        while (cs !== top) {
            while (ts !== top) {

                console.log("currentState=%s, targetState=%s", cs.name, ts.name);

                if (ts === cs) {
                    return cs;
                }
                ts = ts.parent;
            }
            cs = cs.parent;
        }
        return top;
    };


    return Object.freeze({
        init,
        dispatch,
        transfer,
        isIn,
        findCommonParent    // remove from public interface
    });
}


yHsm.top = top;

module.exports.yEvent = yEvent;
module.exports.yState = yState;
module.exports.yHsm = yHsm;

module.exports.UNHANDLED = UNHANDLED;
module.exports.HANDLED = HANDLED;
module.exports.TRANSFER = TRANSFER;

/*

const testSm = function() {

    const sm = yHsm();
    const dispatch = sm.dispatch;


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

*/
