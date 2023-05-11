"use strict";
// in the three menu button create another menu that will add a log(?)
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
exports.getPastLogs = exports.getCurrentLog = exports.getBookLogs = void 0;
const action_1 = require("../../../config/action");
// for this to work it will be the same implementation -- it will add
const getBookLogs = (uid, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.read)(`
      `);
});
exports.getBookLogs = getBookLogs;
// think of how the data will come back as(?);
// TODO: write typescript
const getCurrentLog = (uid, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.read)(`
      MATCH (:User { uid: $uid })--(book:Book {id: $id})-[rel:LOGGED]-(log:Log)
      WHERE rel.complete = false
      WITH log
      ORDER BY log.index DESC
      LIMIT 1
      RETURN log as log
      `, {
        uid: uid,
        id: id,
    });
});
exports.getCurrentLog = getCurrentLog;
const getPastLogs = (uid, count = 10) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.read)(`
      MATCH (:User { $uid })--()--(log:Log)
      `);
});
exports.getPastLogs = getPastLogs;
// get the past 10 records of users past records
// and allow the users to edit them in the spot like recording new page read
// the time, whether they like it or not
// 1) get log indexId with startTime(?)
// 2) then use this logic to subtract the hours
// 3) so tomorrow, when testing it should work fine
