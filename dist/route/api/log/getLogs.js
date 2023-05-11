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
const getLogger_1 = require("../../../model/logs/read/getLogger");
const responseMessage_1 = require("../../../constants/responseMessage");
const router = express_1.default.Router();
router.get('/:uid/:id/current-log', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, id } = req.params;
    try {
        const result = yield (0, getLogger_1.getCurrentLog)(uid, id);
        const logObject = result.records.map((record) => record.toObject());
        const logProperties = logObject[0].log.properties;
        const response = (0, responseMessage_1.createCustomSuccess)('OK');
        res.status(response.status).json({
            log: logProperties,
            message: response.message,
            success: !!logProperties,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
