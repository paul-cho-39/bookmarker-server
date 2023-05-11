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
exports.getCurrentBooks = exports.getAllBooks = void 0;
const action_1 = require("../../../config/action");
// simple match to match when user is selecting books from list of search
const getAllBooks = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, action_1.read)(`
       MATCH (u:User { uid: $uid })
       OPTIONAL MATCH (u)-[r1]-(b1:Book) WHERE type(r1) CONTAINS "CURRENTLY_READING"
       OPTIONAL MATCH (u)-[r2:WANT_TO_READ]-(b2:Book)
       OPTIONAL MATCH (u)-[r3]-(b3:Book) WHERE type(r3) CONTAINS "FINISHED"
       RETURN COLLECT(DISTINCT(b1.id)) as reading, COLLECT(DISTINCT(b2.id)) as want, COLLECT(DISTINCT(b3.id)) as finished
       `, {
        uid: uid,
    });
    return result;
});
exports.getAllBooks = getAllBooks;
// currently reading is viewed in the front page with LOGS?
// require author, thumbnail, title, subtitle, logs of the book
const getCurrentBooks = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, action_1.read)(`
      MATCH (u:User { uid: $uid })-[rel]-(bookLists:Book:Book)-[:WROTE]-(a:Author:Author)
      WHERE type(rel) CONTAINS "CURRENTLY_READING"
      WITH bookLists, a.name as author, rel, rel.dateAdded AS unconvertedDate,
      CASE 
         WHEN type(rel) = 'CURRENTLY_READING:PRIMARY' THEN 'PRIMARY'
         ELSE 'CURRENTLY_READING'
      END as relType
      WITH *
      RETURN 
         DISTINCT(bookLists.title) as title, 
         bookLists.id as id,
         bookLists.subtitle as subtitle, 
         bookLists.thumbnail as thumbnail, 
         toString(unconvertedDate) as date,
         relType as type, 
         COLLECT(author) as authors  
      `, {
        uid: uid,
    });
});
exports.getCurrentBooks = getCurrentBooks;
