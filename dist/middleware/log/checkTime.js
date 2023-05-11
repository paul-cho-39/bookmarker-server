"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessage_1 = require("../../constants/responseMessage");
// will return false EVERY TIME
const checkTime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime } = req.body;
    const convertedStartTime = new Date(startTime);
    const currentDate = Date.now();
    const threshold = 12 * 60 * 60 * 1000; // 12 hours
    if (currentDate - convertedStartTime.getTime() <= threshold) {
        next((0, responseMessage_1.createCustomError)('INVALID_INPUT'));
    }
    next();
});
exports.default = checkTime;
// 1) separate the logic
// 2) GET and retrieve the logs
// 3) no logs using Math.min(log, 0);
// 4) if it is the 'SAME LOG' AND 'checkTime'
// then throw an error;
