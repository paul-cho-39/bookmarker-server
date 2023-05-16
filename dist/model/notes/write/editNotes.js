"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePartialNoteFromFavorite = exports.deleteNoteFromFavorite = exports.addPartialNoteToFavorite = exports.addNoteToFavorite = exports.editNote = void 0;
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
// adding the entire note
// CONSIDER: this does NOT create a snapshot of the note so if the note is changed
// the favorited part of the note is changed as well
const addNoteToFavorite = (uid, noteId) => {
    return (0, action_1.write)(`
         MATCH (user:User { uid: $uid }), (note:Note { id: $noteId })
         CREATE (user)-[:FAVORITED_NOTE { dateAdded: datetime() }]->(note)
         `, {
        uid: uid,
        noteId: noteId,
    });
};
exports.addNoteToFavorite = addNoteToFavorite;
// for adding another users notes and highlight them so it can be added to their
// notes(?)
// features: would like to implement this where if the user adds another users note
// then this note is REFERENCED back to the original user
const addPartialNoteToFavorite = (uid, noteId, noteParams) => {
    // the logic for parsing quotes should be in controllers/helpers
    const favoriteNoteParam = Object.assign(Object.assign({}, noteParams), { uid: uid, id: noteId });
    return (0, action_1.write)(`
        MATCH (user:User { uid: $uid }), (note:Note { id: $noteId })
        CREATE (fn:FavoritedNote)
        SET fn = $favoriteNoteParam
        CREATE (user)-[:FAVORITED_NOTE]->(fn) 
        CREATE (fn)-[:BASED_ON { dateAdded: datetime() }]->(note)
           `, {
        uid: uid,
        id: noteId,
        favoriteNoteParam: favoriteNoteParam,
    });
};
exports.addPartialNoteToFavorite = addPartialNoteToFavorite;
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
const deletePartialNoteFromFavorite = (uid, noteId) => {
    return (0, action_1.write)(`
       MATCH (u:User { uid: $uid })-[rel1:FAVORITED]->(fn:FavoritedNote { userId: u.uid, noteId: $noteId })-[rel2:BASED_ON]->(n:Note)
       DELETE rel1, rel2, fn
       `, {
        uid: uid,
        noteId: noteId,
    });
};
exports.deletePartialNoteFromFavorite = deletePartialNoteFromFavorite;
