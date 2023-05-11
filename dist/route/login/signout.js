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
const userAction_1 = require("../../model/auth/userAction");
const route = express_1.default.Router();
// question: should it delete the user by detaching it?
// how to detect when the user is signed out (for bug related reasons)
// or they deleted the app whereby it is automatically signed out
route.delete('/user/signout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('The user is attempting to signout');
    const { email } = req.body;
    yield (0, userAction_1.signOutUser)(email);
    console.log('JOB DONE (DELETING) :D');
    res.status(201).json({ status: true, message: 'User successfully signed out' });
}));
exports.default = route;
