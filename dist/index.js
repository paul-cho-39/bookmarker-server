"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./route/index"));
const express_2 = __importDefault(require("./express"));
const errorhandler_1 = __importDefault(require("./middleware/errorhandler"));
// to set the env path for applicationDefault to read
// $env=<TO_SERVICE_ACCOUNT>.json
const app_1 = require("firebase-admin/app");
const auth = (0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
});
dotenv_1.default.config();
const port = process.env.PORT || 5000;
express_2.default.use(express_1.default.json());
express_2.default.use(express_1.default.urlencoded({ extended: false }));
// get all routes
express_2.default.use(index_1.default);
express_2.default.use(errorhandler_1.default);
express_2.default.listen(port, () => {
    console.log(`The server is working from port ${port}`);
});
// instead of app.use -> have to create a mapping!
// look into this: https://github.com/expressjs/express/blob/master/examples/route-map/index.js
// TODO: have to write "errorMiddleware" to catch some of
// the errors
