"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessage_1 = require("../../constants/responseMessage");
// this is not a promise
const checkTime = (req, _res, next) => {
    // the current time is passed
    const { time, threshold } = req.body;
    const { startTime, currentTime } = time;
    // TODO: have to get the currentTime and see if it works for date here
    // const threshold = 12 * 60 * 60 * 1000; // 12 hours
    // if it passes this it wont record
    if (currentTime.getTime() - startTime.getTime() >= threshold) {
        next((0, responseMessage_1.createCustomError)('INVALID_INPUT'));
    }
    next();
};
exports.default = checkTime;
// 1) separate the logic
// 2) GET and retrieve the logs
// 3) no logs using Math.min(log, 0);
// 4) if it is the 'SAME LOG' AND 'checkTime'
// then throw an error;
