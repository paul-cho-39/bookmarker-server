"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUserById_1 = require("../../../middleware/user/getUserById");
const handleAuthentication_1 = require("../../../controllers/authentication/handleAuthentication");
const provider_1 = require("../../../middleware/user/provider");
const userData_1 = require("../../../controllers/helpers/authentication/userData");
const route = express_1.default.Router();
route.use('/signup', getUserById_1.inititateAuthentication);
route.use('/provider', (0, provider_1.createParseProviderData)(userData_1.transportDataToNeo4j), provider_1.checkUserStatus);
// TODO: when user recieves its first time then possibly change
route.post('/signin', getUserById_1.getUserRecordById, handleAuthentication_1.signin);
route.post('/provider', handleAuthentication_1.signinWithProviderasync);
route.post('/signup', getUserById_1.getUserRecordById, handleAuthentication_1.signup);
route.delete('/signout', handleAuthentication_1.signout);
exports.default = route;
