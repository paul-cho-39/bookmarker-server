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
exports.writeNotes = void 0;
const responseMessage_1 = require("../../../constants/responseMessage");
const createNotes_1 = require("../../../model/notes/write/createNotes");
function writeNotes(req, res, next, isPublic) {
    return __awaiter(this, void 0, void 0, function* () {
        // parse the data here(?)
        const { noteBody, noteRel } = req.body;
        try {
            (0, createNotes_1.createNote)(req.params, noteBody, noteRel, isPublic);
            const response = (0, responseMessage_1.createCustomSuccess)('CREATED');
            res.status(response.status).send(response.message);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.writeNotes = writeNotes;
