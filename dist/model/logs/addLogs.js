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
exports.endLogging = exports.startLogging = void 0;
const action_1 = require("../../config/action");
// log_num, bookmark_number, start-Time, end_time, like/dislike
// location, keywords, pageRead -> if the value is null then is there a way to input an avg like inferring?
// how about rereading books?
const startLogging = (uid, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.write)(`
        MATCH (u:User { uid: $uid })-[rel]-(book:Book { id: $id })
        WHERE rel CONTAINS "CURRENTLY_READING"
        OPTIONAL MATCH (book)-[:LOGGED]->(log:Log)
        WITH COALESCE(MAX(log.index), 0) as totalIndex, book
        CREATE (newLog:Log)-[:LOGGED { startDate: datetime() }]->(book)
        CALL apoc.atomic.add(newLog, 'index', 1)
        YIELD newValue
        RETURN newValue
        `, {
        uid: uid,
        id: id,
    });
    // return the newValue as a response
});
exports.startLogging = startLogging;
// TODO: in the front end it is a timer but here it is logging time
// and because of the discrepency of timing time tim ecan be a bit different?
// how about sending the data via http and use :LOGGED.startDate + timer = :LOGGED.endDate
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
