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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinWithProviderasync = exports.signin = exports.signout = exports.signup = void 0;
const responseMessage_1 = require("../../constants/responseMessage");
const userAction_1 = require("../../model/auth/userAction");
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        try {
            yield (0, userAction_1.createUser)(req.data, name);
            const response = (0, responseMessage_1.createCustomSuccess)('CREATED');
            res.json({ status: response.status, message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signup = signup;
function signin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('The user is attempting to sign in');
        const { uid } = req.data;
        try {
            yield (0, userAction_1.signInUser)(uid);
            const response = (0, responseMessage_1.createCustomSuccess)('OK');
            res.json({ status: response.status, message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signin = signin;
function signout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('The user is attempting to signout');
        const { email } = req.body;
        try {
            yield (0, userAction_1.signOutUser)(email);
            const response = (0, responseMessage_1.createCustomSuccess)('NO_CONTENT');
            res.json({ status: response.status, message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signout = signout;
function signinWithProviderasync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.data;
        if (req.isNewUser) {
            yield (0, userAction_1.createUser)(req.data);
        }
        else {
            yield (0, userAction_1.signInUser)(data.uid);
        }
        try {
            const message = req.isNewUser ? 'Created' : 'OK';
            const response = (0, responseMessage_1.createCustomSuccess)('OK', message);
            res.json({ success: response.status, message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signinWithProviderasync = signinWithProviderasync;
