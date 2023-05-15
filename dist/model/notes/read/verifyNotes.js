"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNoteUsers = void 0;
const action_1 = require("../../../config/action");
const isNoteUsers = (uid, noteId) => {
    return (0, action_1.read)(`
        MATCH (:User { uid: $uid })--(note:Note { id: $noteId })
        RETURN note.id as noteId
        `, {
        uid: uid,
        noteId: noteId,
    });
};
exports.isNoteUsers = isNoteUsers;
