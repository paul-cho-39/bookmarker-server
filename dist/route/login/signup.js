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
route.use('/user/signup', user_1.inititateAuthentication);
route.post('/user/signup', user_1.getUserRecordById, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { email, emailVerified, uid, creationTime } = req.data;
    yield (0, userAction_1.createUser)(req.data, name);
    console.log('JOB DONE!:D');
    res.json({ status: 'success', message: 'Added a user node' });
}));
exports.default = route;
