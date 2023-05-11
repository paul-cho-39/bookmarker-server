"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteAccount_1 = __importDefault(require("./deleteAccount"));
const provider_1 = __importDefault(require("./provider"));
const signin_1 = __importDefault(require("./signin"));
const signout_1 = __importDefault(require("./signout"));
const signup_1 = __importDefault(require("./signup"));
const route = express_1.default.Router();
route.use('/user', deleteAccount_1.default);
route.use('/user', provider_1.default);
route.use('/user', signin_1.default);
route.use('/user', signout_1.default);
route.use('/user', signup_1.default);
exports.default = route;
