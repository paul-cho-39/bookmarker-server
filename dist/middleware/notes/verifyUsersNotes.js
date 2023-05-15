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
exports.verifyUsersNote = void 0;
const responseMessage_1 = require("../../constants/responseMessage");
const verifyNotes_1 = require("../../model/notes/read/verifyNotes");
// ensuring that when the user is editing it is their own
const verifyUsersNote = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, noteId } = req.params;
        const checkId = yield (0, verifyNotes_1.isNoteUsers)(uid, noteId);
        const verified = checkId.records.map((record) => record.get('noteId'));
        if (!verified) {
            return next((0, responseMessage_1.createCustomError)('UNAUTHORIZED_ACCESS'));
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.verifyUsersNote = verifyUsersNote;
