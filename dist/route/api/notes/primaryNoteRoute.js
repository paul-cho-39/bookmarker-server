"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_1 = require("../../../controllers/notes/post/add");
const paramConverter_1 = require("../../../middleware/log/paramConverter");
const router = express_1.default.Router();
router.use(`/:uid/:id/:logIndex/`, paramConverter_1.paramLogConverter);
// verifyUserNote for editing
router.post(`/:uid/:id/:logIndex/private`, (req, res, next) => {
    (0, add_1.writeNote)(req, res, next, false);
});
router.post(`/:uid/:id/:logIndex/public`, (req, res, next) => {
    (0, add_1.writeNote)(req, res, next, true);
});
exports.default = router;
