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
const writeLogger_1 = require("../../../model/logs/write/writeLogger");
const responseMessage_1 = require("../../../constants/responseMessage");
const router = express_1.default.Router();
// router.use('/', async (req: Request, res: Response, next: NextFunction) => {
//    if (req.body.data.startTime) {
//       return res.redirect(`/${req.params.uid}/${req.params.id}/end`);
//    } else {
//       return res.redirect(`/${req.params.uid}/${req.params.id}/log-manually`);
//    }
// });
router.post('/:uid/:id/manual-log', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid } = req.params;
    const data = req.body;
    console.log('data has been recieved: ', data);
    try {
        yield (0, writeLogger_1.manualLogInput)(uid, id, data);
        const response = (0, responseMessage_1.createCustomSuccess)('CREATED');
        res.status(response.status).json({ message: response.message });
    }
    catch (err) {
        next(err);
    }
}));
// INITIAL logger not manual
// TEST: have to test whether this works at all
// the point is NOT TO increase logIndex
// so if that is the case redirect(?);
// or is there a way for cleaning up old logs?
router.post('/:uid/:id/start', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid } = req.params;
    const { startTime } = req.body;
    try {
        const result = (yield (0, writeLogger_1.startLogging)(uid, id, startTime));
        const properties = result[0].log.properties;
        const response = (0, responseMessage_1.createCustomSuccess)('OK');
        console.log('log finished', response);
        res.status(response.status).json({ log: properties, message: response.message });
    }
    catch (err) {
        next(err);
    }
}));
// do not increase the logIndex(?) if the startTime has not passed 12 hours mark
// then
router.post('/:uid/:id/:logIndex/end', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid, logIndex } = req.params;
    const data = req.body;
    try {
        yield (0, writeLogger_1.endLogging)(uid, id, logIndex, data);
        const response = (0, responseMessage_1.createCustomSuccess)('CREATED');
        res.status(response.status).json({ message: response.message });
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/:uid/:id/:logIndex/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid, logIndex } = req.params;
    try {
        yield (0, writeLogger_1.removeBookLog)(uid, id, logIndex);
        const response = (0, responseMessage_1.createCustomSuccess)('NO_CONTENT');
        res.status(response.status).json({ message: response.message });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
// For here, whenever this is called, it will increase the "logIndex" and create a new "Log" node and set the increased "logIndex" as its property.
// Create a middleware sort for expressJS to check the condition whether to increase "logIndex" and create a new "Log" node.
// The condition is 1) :LOGGED { startTime } - the property "startTime" with
// see if the data is persisted
// if not then have to add middleware for this
