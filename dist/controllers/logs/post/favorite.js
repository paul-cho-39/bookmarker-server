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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavoriteSession = void 0;
const initiate_1 = require("../../../model/logs/write/initiate");
const responseMessage_1 = require("../../../constants/responseMessage");
function toggleFavoriteSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, id, logIndex } = req.params;
        const { bookmarked } = req.body;
        const convertedLogIndex = typeof logIndex === 'string' ? parseInt(logIndex) : logIndex;
        try {
            yield (0, initiate_1.editFavoriteSession)(uid, id, bookmarked, convertedLogIndex);
            const response = (0, responseMessage_1.createCustomSuccess)('OK');
            res.status(response.status).json({ message: response.message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.toggleFavoriteSession = toggleFavoriteSession;
