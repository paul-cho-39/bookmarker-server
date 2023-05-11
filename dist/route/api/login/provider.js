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
const userData_1 = require("../../../controllers/user/userData");
const action_1 = require("../../../config/action");
const userAction_1 = require("../../../model/auth/userAction");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const route = express_1.default.Router();
route.use('/provider', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request for provider is starting...');
    const { email } = req.body;
    try {
        const userData = yield firebase_admin_1.default.auth().getUserByEmail(email);
        req.data = Object.assign({}, (0, userData_1.transportDataToNeo4j)(userData));
        next();
    }
    catch (err) {
        next(err);
    }
}));
route.use('/provider', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield (0, action_1.read)(`
        MATCH(u:User { email: $email })
        RETURN u.email as user
        `, {
        email: email,
    });
    const isUserInDatabase = user.records
        .map((record) => record.get('user'))
        .toString();
    req.isNewUser = (isUserInDatabase === null || isUserInDatabase === void 0 ? void 0 : isUserInDatabase.length) < 1;
    next();
}));
// POSSIBLE TODO: when user recieves its first time then possibly change
route.post('/provider', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.data;
    if (req.isNewUser) {
        yield (0, userAction_1.createUser)(req.data);
    }
    else {
        yield (0, userAction_1.signInUser)(data.uid);
    }
    console.log('JOB DONE WITH PROVIDERS :D');
    const message = req.isNewUser ? 'Created a new node for user' : 'Session is linked to the user';
    res.json({ success: true, message: message });
}));
exports.default = route;
