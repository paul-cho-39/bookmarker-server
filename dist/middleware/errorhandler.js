"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    // the most basic of error most will be handled using http-errors
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        status: err.status,
        message: err.message,
        code: err.code,
    });
}
exports.default = errorHandler;
