"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const selectPrimary_1 = require("../../../controllers/library/post/selectPrimary");
const router = express_1.default.Router();
router.post('/:uid/:id/edit-primary', selectPrimary_1.editPrimary);
exports.default = router;
