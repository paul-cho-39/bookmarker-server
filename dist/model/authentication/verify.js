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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class VerifyLogin {
    getDecodedToken(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // throw error inside catch error
            const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(idToken);
            VerifyLogin.uid = decodedToken.uid;
            this.getUsersData();
            return decodedToken.uid;
        });
    }
    getUsersData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!VerifyLogin.uid) {
                throw new Error("Can't find variable: uid");
            }
            const userData = yield firebase_admin_1.default.auth().getUser(VerifyLogin.uid);
            return userData.toJSON();
        });
    }
}
exports.default = VerifyLogin;
