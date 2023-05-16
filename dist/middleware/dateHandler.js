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
exports.processDates = void 0;
function processDates(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // all request with dates should be coming with dates objects
        if (req.body.dates) {
            const dateObj = req.body.dates;
            req.neo4jDates = Object.entries(dateObj).reduce((acc, [key, value]) => {
                const date = new Date(value);
                const neo4jDate = date.toISOString().split('T')[0];
                const neo4jDateTime = date.toISOString();
                acc[key] = neo4jDateTime;
                return acc;
            }, {});
        }
        next();
    });
}
exports.processDates = processDates;
