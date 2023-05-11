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
exports.getUserRecordById = exports.inititateAuthentication = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const userData_1 = __importDefault(require("../../model/auth/userData"));
const userAction_1 = require("../../model/auth/userAction");
const inititateAuthentication = (_req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserInDatabase = yield firebase_admin_1.default.auth().listUsers(1);
    //    test this one right now
    if (isUserInDatabase.users) {
        console.log('SHOULD BE CALLED EVERY TIME');
        next('route');
    }
    else {
        yield (0, userAction_1.initiateUserConstraint)();
        next();
    }
});
exports.inititateAuthentication = inititateAuthentication;
const getUserRecordById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idToken } = req.body;
    console.log('Is idToken being called', idToken);
    const user = new userData_1.default();
    const userData = yield user.getDecodedToken(idToken, res);
    req.data = Object.assign({}, userData);
    next();
});
exports.getUserRecordById = getUserRecordById;
