"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./api/login/index"));
const index_2 = __importDefault(require("./api/library/index"));
const index_3 = __importDefault(require("./api/log/index"));
const route = express_1.default.Router();
// should check every authentication from all routers of user?
// later use forEach or some other function to get all of this
route.use('/api', index_1.default);
route.use('/api', index_2.default);
route.use('/api', index_3.default);
exports.default = route;
