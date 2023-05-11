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
exports.transportDataToNeo4j = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class UserData {
    getDecodedToken(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(idToken);
                UserData._uid = decodedToken.uid;
                return decodedToken.uid;
            }
            catch (error) {
                console.log('Error message:', error);
            }
        });
    }
    getUsersData(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!UserData._uid) {
                throw new Error("ReferenceError: Can't find variable: uid");
            }
            const userData = yield firebase_admin_1.default.auth().getUser(UserData._uid);
            return userData;
        });
    }
    get uid() {
        return UserData._uid;
    }
}
exports.default = UserData;
const transportDataToNeo4j = (user) => {
    // for creation time, if userIsActive && new Date() - user.meta.creationTime
    // will show how long the user has been logged on for?
    const userInfo = {
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
        creationTime: user.metadata.creationTime,
    };
    return userInfo;
};
exports.transportDataToNeo4j = transportDataToNeo4j;
