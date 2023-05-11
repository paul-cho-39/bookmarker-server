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
const userAction_1 = require("../model/auth/userAction");
const responseMessage_1 = require("../constants/responseMessage");
function authenticateUser(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, id } = req.params;
        console.log('Checking if user has session...', uid);
        try {
            const user = yield (0, userAction_1.isUserInSession)(uid);
            const hasSession = user.records.map((record) => record.get('user')).toString();
            if (!hasSession) {
                return next((0, responseMessage_1.createCustomError)('UNAUTHORIZED_ACCESS'));
            }
            next();
        }
        catch (error) {
            return next((0, responseMessage_1.createCustomError)('INVALID_EMAIL'));
        }
    });
}
exports.default = authenticateUser;
