"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// likely to change name
const express_1 = __importDefault(require("express"));
const logs_1 = require("./../../../controllers/logs");
const favoriteSession_1 = require("../../../middleware/log/favoriteSession");
const router = express_1.default.Router();
router.get('/:uid/:id/current-log', logs_1.getUsersCurrentlyReadingLog);
router.post('/:uid/:id/manual-log', logs_1.addLogManually);
// or is there a way for cleaning up old logs?
router.post('/:uid/:id/start', logs_1.startLog);
// do not increase the logIndex(?) if the startTime has not passed 12 hours mark
router.post('/:uid/:id/:logIndex/end', logs_1.endLog);
router.post(`/:uid/:id/:logIndex/favorite-session`, favoriteSession_1.checkBookmarkedValue, logs_1.toggleFavoriteSession);
router.delete('/:uid/:id/:logIndex/delete', logs_1.deleteSingleLog);
exports.default = router;
