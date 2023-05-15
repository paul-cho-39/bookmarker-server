"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteFromFavorite = exports.addNoteToFavorite = exports.editNote = exports.createNote = void 0;
const action_1 = require("../../../config/action");
// :CONSIDER for logs, can include chapters/sections which can be used, but the downside is
// misinformation
const createNote = (params, noteParams, relParams, isPublic) => {
    const { id, uid, logIndex } = params;
    let query = `
        MATCH (user:User { uid: $uid })--(book:Book { id: $id })--(log:Log { index: $logIndex })
        CREATE (user)-[WROTE { createdAt: $createdAt }]->(note:Note $params })-[:ABOUT]->(log)
        rel = $relParams
        `;
    if (isPublic) {
        query += `CREATE (note)-[:SHARED]->(book)`;
    }
    return (0, action_1.write)(query, {
        uid: uid,
        id: id,
        logIndex: logIndex,
        relParams: relParams.createdAt,
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
// to do this requires "noteId" - meaning that it would require
// adding a favorite note even though it is not their notes
const addNoteToFavorite = (uid, noteId) => {
    return (0, action_1.write)(`
        MATCH (u:User { uid: $uid }), (n:Note { id: $noteId })
        CREATE (u)-[:FAVORITED_NOTE]-(n)
        `, {
        uid: uid,
        noteId: noteId,
    });
};
exports.addNoteToFavorite = addNoteToFavorite;
// TODO: save this in another file that is more fitting
const deleteNoteFromFavorite = (uid, noteId) => {
    return (0, action_1.write)(`
        MATCH (u:User { uid: $uid })-[rel:FAVORITE_NOTE]-(n:Note { id: $noteId })
        DELETE rel;
        `, {
        uid: uid,
        noteId: noteId,
    });
};
exports.deleteNoteFromFavorite = deleteNoteFromFavorite;
// TODO: create a helper where the logIndex and uniqueId is assigned to noteId
