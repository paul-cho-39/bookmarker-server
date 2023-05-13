"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = void 0;
const action_1 = require("../../../config/action");
const createNote = (params, noteParams, isPublic) => {
    const { id, uid, logIndex } = params;
    let query = `
        MATCH (user:User { uid: $uid })--(book:Book { id: $id })--(log:Log { index: $logIndex })
        CREATE (user)-[:WROTE]->(note:Note $params })-[:ABOUT]->(log)
        `;
    if (isPublic) {
        query += `CREATE (note)-[:SHARED]->(book)`;
    }
    return (0, action_1.write)(query, {
        uid: uid,
        id: id,
        logIndex: logIndex,
        params: noteParams,
    });
};
exports.createNote = createNote;
// a user writes the note
// if already created for that very logIndex then
