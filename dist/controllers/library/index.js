"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleThumbnail = exports.getUsersCurrentlyReading = exports.getUserBooks = exports.selectPrimary = exports.editPrimary = exports.bookHandler = void 0;
const editBookHandler_1 = __importDefault(require("./post/editBookHandler"));
exports.bookHandler = editBookHandler_1.default;
const selectPrimary_1 = require("./post/selectPrimary");
Object.defineProperty(exports, "editPrimary", { enumerable: true, get: function () { return selectPrimary_1.editPrimary; } });
Object.defineProperty(exports, "selectPrimary", { enumerable: true, get: function () { return selectPrimary_1.selectPrimary; } });
// getters
const thumbnail_1 = __importDefault(require("./get/thumbnail"));
exports.googleThumbnail = thumbnail_1.default;
const userLibraries_1 = require("./get/userLibraries");
Object.defineProperty(exports, "getUserBooks", { enumerable: true, get: function () { return userLibraries_1.getUserBooks; } });
Object.defineProperty(exports, "getUsersCurrentlyReading", { enumerable: true, get: function () { return userLibraries_1.getUsersCurrentlyReading; } });
