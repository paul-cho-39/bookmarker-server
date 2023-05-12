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
exports.removeAllLogsInBook = exports.removeBookLog = void 0;
const action_1 = require("../../../config/action");
const removeBookLog = (uid, id, loggerIndex) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.write)(`
       MATCH (:User { uid: $uid })--(book:Book {id: $id })-[logRel:LOGGED]-(log:Log { index: $loggerIndex})
       OPTIONAL MATCH (book)--(logs:Log) WHERE logs.index >= $loggerIndex 
       SET logs.index = logs.index - 1
       WITH log, logRel
       DETACH DELETE logRel, log 
       `, {
        uid: uid,
        id: id,
        loggerIndex: loggerIndex,
    });
});
exports.removeBookLog = removeBookLog;
const removeAllLogsInBook = (uid, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.write)(`
       MATCH (:User { uid: $uid })--(:Book {id: $id })-[logRel:LOGGED]-(log:Log)
       DETACH DELETE log, logRel
       `);
});
exports.removeAllLogsInBook = removeAllLogsInBook;
