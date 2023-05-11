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
const express_1 = __importDefault(require("express"));
const bookWrite_1 = __importDefault(require("../../../model/library/write/bookWrite"));
const responseMessage_1 = require("../../../constants/responseMessage");
const router = express_1.default.Router();
// for this one it is changing the priamry book?
router.post('/:uid/:id/edit-primary', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.default = router;
