"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// likely to change name
const express_1 = __importDefault(require("express"));
const logs_1 = require("./../../../controllers/logs");
const favoriteSession_1 = require("../../../middleware/log/favoriteSession");
const paramConverter_1 = require("../../../middleware/log/paramConverter");
const dateHandler_1 = require("../../../middleware/dateHandler");
const router = express_1.default.Router();
router.use('/:uid/:id/:logIndex', paramConverter_1.paramLogConverter);
router.get('/:uid/:id/current-log', logs_1.getUsersCurrentlyReadingLog);
router.get('/:uid/:id/book-logs', logs_1.getUsersLogByBook);
router.post('/:uid/:id/manual-log', logs_1.addLogManually);
// or is there a way for cleaning up old logs?
router.post('/:uid/:id/start', dateHandler_1.processDates, logs_1.startLog);
// do not increase the logIndex(?) if the startTime has not passed 12 hours mark
// if the 12 hour comes from the setting along with the body then it is the settings mark
router.post('/:uid/:id/:logIndex/end', dateHandler_1.processDates, logs_1.endLog);
router.post(`/:uid/:id/:logIndex/favorite-session`, favoriteSession_1.checkBookmarkedValue, logs_1.toggleFavoriteSession);
router.delete('/:uid/:id/:logIndex/delete', logs_1.deleteSingleLog);
exports.default = router;
