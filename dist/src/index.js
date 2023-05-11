"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const express_1 = __importDefault(require("express"));
const signin_1 = __importDefault(require("./route/login/signin"));
// Securely store the JSON file containing the key BUT first test with importing from json
// move the file to authenticate/signin
// to set the env path for applicationDefault to read
// $env=<TO_SERVICE_ACCOUNT>.json
const app_1 = require("firebase-admin/app");
const auth = (0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
});
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// can use bodyParser library
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(signin_1.default);
// app.use(signup);
app.listen(port, () => {
    console.log(`The server is working from port ${port}`);
});
