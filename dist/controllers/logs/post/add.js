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
exports.endLog = exports.startLog = exports.addLogManually = void 0;
const initiate_1 = require("../../../model/logs/write/initiate");
const responseMessage_1 = require("../../../constants/responseMessage");
function addLogManually(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, uid } = req.params;
        const data = req.body;
        console.log('data has been recieved: ', data);
        try {
            yield (0, initiate_1.manualLogInput)(uid, id, data);
            const response = (0, responseMessage_1.createCustomSuccess)('CREATED');
            res.status(response.status).json({ message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.addLogManually = addLogManually;
function startLog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, uid } = req.params;
        const { startTime } = req.body;
        try {
            const result = (yield (0, initiate_1.startLogging)(uid, id, startTime));
            const properties = result[0].log.properties;
            const response = (0, responseMessage_1.createCustomSuccess)('OK');
            console.log('log finished', response);
            res.status(response.status).json({ log: properties, message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.startLog = startLog;
function endLog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, uid, logIndex } = req.params;
        const data = req.body;
        try {
            yield (0, initiate_1.endLogging)(uid, id, logIndex, data);
            const response = (0, responseMessage_1.createCustomSuccess)('CREATED');
            res.status(response.status).json({ message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.endLog = endLog;
