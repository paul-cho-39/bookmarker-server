"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addLog_1 = __importDefault(require("./addLog"));
const getLogs_1 = __importDefault(require("./getLogs"));
const editLogs_1 = __importDefault(require("./editLogs"));
const router = express_1.default.Router();
router.use('/book-log', addLog_1.default);
router.use('/book-log', getLogs_1.default);
router.use('/book-log', editLogs_1.default);
exports.default = router;
