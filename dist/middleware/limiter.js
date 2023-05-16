"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// all rate limits are included in this page
const passwordLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
});
exports.passwordLimiter = passwordLimiter;
