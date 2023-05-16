"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = void 0;
const action_1 = require("../../../config/action");
// :CONSIDER for logs, can include chapters/sections which can be used, but the downside is
// misinformation
const createNote = (params, noteParams, relParams, isPublic) => {
    const { id, uid, index } = params;
    let query = `
        MATCH (user:User { uid: $uid })--(book:Book { id: $id })--(log:Log { index: $logIndex })
        CREATE (user)-[WROTE { createdAt: $createdAt }]->(note:Note $params })-[:ABOUT]->(log)
        note.id = apoc.create.uuid()
        `;
    if (isPublic) {
        query += `CREATE (note)-[:SHARED]->(book)`;
    }
    return (0, action_1.write)(query, {
        uid: uid,
        id: id,
        logIndex: index,
        createdAt: relParams.createdAt,
        params: noteParams,
    });
};
exports.createNote = createNote;
