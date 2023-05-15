"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNoteToFavorite = exports.editNote = void 0;
const action_1 = require("../../../config/action");
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
