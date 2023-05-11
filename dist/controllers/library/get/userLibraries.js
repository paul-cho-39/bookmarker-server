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
exports.getUsersCurrentlyReading = exports.getUserBooks = void 0;
const covertArraytoObject_1 = require("../../helpers/covertArraytoObject");
const responseMessage_1 = require("../../../constants/responseMessage");
const bookRead_1 = require("../../../model/library/read/bookRead");
const currentBook_1 = __importDefault(require("../../helpers/library/currentBook"));
function getUserBooks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('fetching users library...');
        const { uid } = req.params;
        try {
            const userBooks = yield (0, bookRead_1.getAllBooks)(uid);
            const userListInArray = userBooks.records.map((record) => record.toObject());
            const userBookLists = (0, covertArraytoObject_1.convertArrayIntoObject)(userListInArray);
            const response = (0, responseMessage_1.createCustomSuccess)('OK');
            res.status(response.status).json({ data: userBookLists, message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getUserBooks = getUserBooks;
function getUsersCurrentlyReading(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Fetching users currently-reading lists...');
        const { uid } = req.params;
        try {
            const currentBookObj = yield (0, bookRead_1.getCurrentBooks)(uid);
            const userListInArray = currentBookObj.records.map((record) => record.toObject());
            const books = new currentBook_1.default(userListInArray);
            const currentBooks = books.shuffleData();
            const response = (0, responseMessage_1.createCustomSuccess)('OK');
            res.status(response.status).json({ data: currentBooks, message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getUsersCurrentlyReading = getUsersCurrentlyReading;
