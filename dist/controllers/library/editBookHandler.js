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
const bookData_1 = __importDefault(require("../../controllers/helpers/library/bookData"));
const bookWrite_1 = __importDefault(require("../../model/library/write/bookWrite"));
const responseMessage_1 = require("../../constants/responseMessage");
function bookHandler(req, res, next, bookAction, relType) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, id } = req.params;
        const googleData = req.googleData;
        const data = (0, bookData_1.default)(googleData);
        const bookWrite = new bookWrite_1.default(uid, id, data);
        console.log('handling the books and processing...');
        try {
            switch (bookAction) {
                case 'edit':
                    yield bookWrite.editBook(relType);
                    break;
                case 'finished':
                    yield bookWrite.getFinishedDates();
                    break;
                case 'remove':
                    yield bookWrite.deleteBook();
            }
            yield Promise.all([bookWrite.createAuthors(), bookWrite.createCategories()]);
            const customSuccess = (0, responseMessage_1.createCustomSuccess)('CREATED');
            res.status(customSuccess.status).json({
                status: customSuccess.status,
                message: customSuccess.message,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = bookHandler;
