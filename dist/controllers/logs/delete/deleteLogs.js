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
exports.deleteAllLogs = exports.deleteSingleLog = void 0;
const remove_1 = require("../../../model/logs/write/remove");
const responseMessage_1 = require("../../../constants/responseMessage");
function deleteSingleLog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, uid, logIndex } = req.params;
        try {
            yield (0, remove_1.removeBookLog)(uid, id, logIndex);
            const response = (0, responseMessage_1.createCustomSuccess)('NO_CONTENT');
            res.status(response.status).json({ message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.deleteSingleLog = deleteSingleLog;
// :TODO - complete deleting ALL logs associated with the book
function deleteAllLogs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, uid } = req.params;
        try {
        }
        catch (err) {
            next(err);
        }
    });
}
exports.deleteAllLogs = deleteAllLogs;
