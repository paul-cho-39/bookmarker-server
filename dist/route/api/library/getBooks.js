"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// bundle this together
const getBookData_1 = __importDefault(require("../../../middleware/library/getBookData"));
const library_1 = require("../../../controllers/library");
const router = express_1.default.Router();
router.get('/thumbnail/:id', getBookData_1.default, library_1.googleThumbnail);
router.get('/books/:uid', library_1.getUserBooks);
router.get('/current/:uid', library_1.getUsersCurrentlyReading);
exports.default = router;
