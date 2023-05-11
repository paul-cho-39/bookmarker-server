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
exports.userBookIdConstraint = exports.userEmailConstraint = exports.userIdConstraint = void 0;
const action_1 = require("../../config/action");
const userIdConstraint = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
     CREATE CONSTRAINT user_email_constraint IF NOT EXISTS 
     FOR (u:User) REQUIRE u.email IS UNIQUE
        `);
});
exports.userIdConstraint = userIdConstraint;
const userEmailConstraint = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
    CREATE CONSTRAINT user_id_constraint IF NOT EXISTS
    FOR (u:User) REQUIRE u.uid IS UNIQUE
    `);
});
exports.userEmailConstraint = userEmailConstraint;
// subject to change
// creating a constraint for indexes and relationship
// one of the way to retain the id for user and book is by combining the ids
// e.g. bookId + uid
// and use this id for logging books?
// and once they are finished set the id
// although if this is the case there must
// but that does NOT MATTER IF MERGE is there since it CANNOT create NEW FINISHED?
const userBookIdConstraint = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
       CREATE CONSTRAINT unique_user_book_id IF NOT EXISTS
       ON 
       ASSERT (b.id, u.uid) IS UNIQUE
       `);
});
exports.userBookIdConstraint = userBookIdConstraint;
// because
