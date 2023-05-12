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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPrimary = exports.selectPrimary = void 0;
const bookWrite_1 = __importDefault(require("../../../model/library/write/bookWrite"));
const responseMessage_1 = require("../../../constants/responseMessage");
function selectPrimary(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid } = req.params;
        const { currentlyReading } = req.body;
        console.log('The users currently reading library:', currentlyReading);
        if (currentlyReading.length <= 1) {
            let id = currentlyReading[0];
            const bookWrite = new bookWrite_1.default(uid, id);
            yield bookWrite.initiatePrimaryBookSelection();
            next();
        }
        next();
    });
}
exports.selectPrimary = selectPrimary;
function editPrimary(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, id } = req.params;
        console.log('Changing primary book...', id);
        const editor = new bookWrite_1.default(uid, id);
        try {
            yield editor.changePrimaryBook();
            const response = (0, responseMessage_1.createCustomSuccess)('OK');
            res.status(response.status).json({ message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.editPrimary = editPrimary;
