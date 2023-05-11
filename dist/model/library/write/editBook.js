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
exports.editBookTime = void 0;
const action_1 = require("../../../config/action");
// when editing time, what else can be combined to edit the time altogether?
const editBookTime = (uid, id, date) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
        MATCH (u:User { uid: $uid })-[rel]-(book:Book { id: $id })
        WHERE type(rel) contains "CURRENTLY_READING" OR "FINISHED" as current_or_finished
        WITH current_or_finished, book
        SET current_or_finished.datetime = datetime($date)
        `, {
        uid: uid,
        id: id,
        date: date,
    });
});
exports.editBookTime = editBookTime;
// if there is no thumbnail then give the user a choice to upload the book image?
