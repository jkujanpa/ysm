
const yfsm = require('./lib/yfsm');
const yhsm = require('./lib/yhsm');

/*
 *  Flat state machine
 */
module.exports.yFState = yfsm.yState;
module.exports.yFsm = yfsm.yFsm;

/*
 *  Hierarchial state machine
 */
module.exports.yEvent = yhsm.yEvent;
module.exports.yHState = yhsm.yState;
module.exports.yHsm = yhsm.yHsm;

module.exports.UNHANDLED = yhsm.UNHANDLED;
module.exports.HANDLED = yhsm.HANDLED;
module.exports.TRANSFER = yhsm.TRANSFER;
