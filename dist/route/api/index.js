"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./login/index"));
const index_2 = __importDefault(require("./library/index"));
const route = express_1.default.Router();
route.use('/api', index_1.default);
route.use('/api', index_2.default);
exports.default = route;
