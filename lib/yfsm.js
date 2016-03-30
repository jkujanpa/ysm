"use strict"


function yState(spec) {
    const handler = spec.handler;
    const entry = spec.entry || function() {};
    const exit = spec.exit || function() {};

    return Object.freeze({
        handler,
        entry,
        exit
    });
};


function yFsm() {
    var state;

    function init(initial) {
        state = initial;
        state.entry();
    };

    function dispatch(event) {
        state.handler(event);
    };

    function transfer(target) {
        state.exit();
        state = target;
        state.entry();
    };

    return Object.freeze({
        init,
        dispatch,
        transfer
    });
};

module.exports.yState = yState;
module.exports.yFsm = yFsm;
