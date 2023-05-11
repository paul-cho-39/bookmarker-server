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
const node_fetch_1 = __importDefault(require("node-fetch"));
const responseMessage_1 = require("../../constants/responseMessage");
function getBookData(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        console.log('fetching google books id:', id);
        const key = process.env.GOOGLE_API_KEY;
        const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${key}`;
        try {
            const response = yield (0, node_fetch_1.default)(url);
            if (response && response.ok) {
                const data = (yield response.json());
                req.googleData = data;
                next();
            }
        }
        catch (error) {
            return next((0, responseMessage_1.createCustomError)('GOOGLE_BOOK_ERROR'));
        }
    });
}
exports.default = getBookData;
