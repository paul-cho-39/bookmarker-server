"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function getNoteId() {
    const noteId = (0, uuid_1.v4)();
    return noteId;
}
exports.default = getNoteId;
