"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const primary_1 = __importDefault(require("./primary"));
const getBooks_1 = __importDefault(require("./getBooks"));
const userLibrary_1 = __importDefault(require("./userLibrary"));
const authenticateUser_1 = __importDefault(require("../../../middleware/authenticateUser"));
const getBookData_1 = __importDefault(require("../../../middleware/library/getBookData"));
const router = express_1.default.Router();
// middleware
router.use('/library/authenticate/:uid', authenticateUser_1.default);
router.use('/library/authenticate/:uid/:id', getBookData_1.default);
// routes
router.use('/library', getBooks_1.default);
router.use('/library/edit', primary_1.default);
router.use('/library/authenticate', userLibrary_1.default);
exports.default = router;
