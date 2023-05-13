"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editNote = exports.createNote = void 0;
const action_1 = require("../../../config/action");
// :CONSIDER for logs, can include chapters/sections which can be used, but the downside is
// misinformation
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
const editNote = (noteId, noteParams) => {
    return (0, action_1.write)(`
        MATCH (note:Note { id: $noteId }) 
        SET note += $noteParams
        `, {
        noteId: noteId,
        noteParams: noteParams,
    });
};
exports.editNote = editNote;
// TODO: create a helper where the logIndex and uniqueId is assigned to noteId
