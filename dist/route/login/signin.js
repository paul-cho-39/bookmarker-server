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
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const userAction_1 = require("../../model/auth/userAction");
const route = express_1.default.Router();
route.post('/user/signin', user_1.getUserRecordById, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('The user is attempting to sign in');
    const { uid } = req.data;
    yield (0, userAction_1.signInUser)(uid);
    console.log('JOB DONE [SIGN IN]! :D');
    res.json({ status: true, message: 'Successfully created a path and a node' });
}));
// TODO: creates a new node to signal that the user 'HAS_SESSION'
exports.default = route;
