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
const dotenv_1 = __importDefault(require("dotenv"));
// test it out
dotenv_1.default.config();
// have this
function getBookData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = process.env.GOOGLE_API_KEY;
        console.log('The key is working, no  need for config()', key);
        const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;
        try {
            const response = yield (0, node_fetch_1.default)(url);
            if (response && response.ok) {
                const data = yield response.json();
                const book = data === null || data === void 0 ? void 0 : data.volumeInfo;
                return book;
            }
        }
        catch (error) {
            console.log('Cannot fetch google api url', error);
        }
    });
}
exports.default = getBookData;
