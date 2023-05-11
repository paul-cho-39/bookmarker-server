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
const bookAction_1 = require("../../../model/library/bookAction");
const userAction_1 = require("../../../model/auth/userAction");
const route = express_1.default.Router();
// 1) write app.param of which, matching :uid
// this checks whether uid exists
// if it exists then next() something like this:
route.param('uid', (req, res, next, uid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Checking if user has session...');
    try {
        const user = yield (0, userAction_1.isUserHasSession)(uid);
        const hasSession = user.records.map((record) => record.get('user')).toString();
        console.log('does it have session?', hasSession);
        if (hasSession)
            next();
    }
    catch (error) {
        res.status(404).json({ status: false, message: 'Unauthorized' });
        next(error);
    }
}));
route.get('/user/:uid/library/reading', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params;
    console.log('Uid', uid);
    res.json({ message: 'Worked' });
}));
// have to test retrieving and saving data into neo4j
route.post('/user/:uid/library/reading', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { body } = req.body;
    const parsedData = JSON.parse(body);
    console.log(`The user is currently reading (parsed version)`, parsedData);
    try {
        yield (0, bookAction_1.addToCurrentlyReading)(uid, parsedData, 'WANT_TO_READ');
        console.log('successfully created currently reading!');
        res.status(200).json({ status: true, message: 'Added to currently reading' });
    }
    catch (err) {
        console.error('The database cannot complete adding the book:', err);
    }
}));
exports.default = route;
// asking questions -- need to provide answers:
// better to source from the core to other packages? lets try this one out and see whether its the same thing?
// writing users path in express -- mainly for GET method
// finding a better way to replace relationship (possibly using apoc library)**
