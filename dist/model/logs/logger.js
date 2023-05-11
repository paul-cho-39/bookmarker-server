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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookLogs = exports.removeBookLog = exports.manualLogInput = exports.endLogging = exports.startLogging = void 0;
const action_1 = require("../../config/action");
// do not think there will be start logging and end logging
// if the nfc can be scanned without the app and recieve the input for new Date();
// then input the date to the data?
// so if the nfc is to be scanned and the data is to be added automatically without opening the app
// recieving input -- a) current datetime
const startLogging = (uid, id, startDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.write)(`
        MATCH (u:User { uid: $uid })-[rel]-(book:Book { id: $id })
        WHERE type(rel) = "CURRENTLY_READING:PRIMARY" 
        with book
        OPTIONAL MATCH (book)-[:LOGGED]->(log:Log)
        WITH COALESCE(MAX(log.index), 0) as totalIndex, book
        CREATE (newLog:Log { index: totalIndex })-[:LOGGED { startDate: $startDate }]->(book)
        CALL apoc.atomic.add(newLog, 'index', 1)
        YIELD newValue
        RETURN newValue, totalIndex
        `, {
        uid: uid,
        id: id,
        date: startDate.toISOString(),
    });
});
exports.startLogging = startLogging;
// this ones for initial and manual inputting
// for manual inputting this will be changed in the middleware
const endLogging = (uid, logIndex, id, loggerData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.write)(`
        MATCH (u:User { uid: $uid })-[:CURRENTLY_READING]-(book:Book { id: $id })-[rel:LOGGED]-(log:Log { index: $logIndex })
        WITH book, rel, log
        MERGE (book)-[rel]-(log)
            ON MATCH SET 
                rel.endDate: $date,
                log = $data
        `, {
        uid: uid,
        id: id,
        logIndex: logIndex,
        data: loggerData,
    });
});
exports.endLogging = endLogging;
// first implement manual logging;
// have a toggle buton for recording the book manually instead
const manualLogInput = (uid, id, loggerData) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime } = loggerData, data = __rest(loggerData, ["startTime", "endTime"]);
    // TEST: see whether setting the data will work
    return yield (0, action_1.write)(`
      MATCH (u:User { uid: $uid })-[rel]-(book:Book { id: $id })
        WHERE type(rel) = "CURRENTLY_READING:PRIMARY" 
        with book
        OPTIONAL MATCH (book)-[:LOGGED]->(log:Log)
        WITH COALESCE(MAX(log.index), 0) as totalIndex, book
        CREATE (newLog:Log { index: totalIndex })-[:LOGGED { startDate: $startTime, endDate: $endTime }]->(book)
        SET newLog = $data
        CALL apoc.atomic.add(newLog, 'index', 1)
        YIELD newValue
        RETURN newValue, totalIndex
      `, {
        uid: uid,
        id: id,
        startTime: startTime,
        endTime: endTime,
        data: data,
    });
});
exports.manualLogInput = manualLogInput;
const removeBookLog = (uid, id, loggerIndex) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.write)(`
      MATCH (u:User { uid: $uid })-[rel]-(book:Book {id: $id })
      WHERE type(rel) = "CURRENTLY_READING:PRIMARY" 
      with book 
      OPTIONAL MATCH (book)-[logRel:LOOGED]-(log:Log { index: $loggerIndex})
      DETACH DELETE logRel, log 
      `, {
        uid: uid,
        id: id,
        loggerIndex: loggerIndex,
    });
});
exports.removeBookLog = removeBookLog;
// in the three menu button create another menu that will add a log(?)
// for this to work it will be the same implementation -- it will add
const getBookLogs = (uid, id) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getBookLogs = getBookLogs;
