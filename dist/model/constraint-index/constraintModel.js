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
exports.loggerIndexConstraint = exports.initiateUserConstraint = exports.bookIdIndex = exports.userEmailConstraint = exports.userIdConstraint = void 0;
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
// create index for book and author(?)
const bookIdIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
       CREATE INDEX book_id_index IF NOT EXISTS
       FOR (b:Book) ON (b.id) 
       `);
});
exports.bookIdIndex = bookIdIndex;
const initiateUserConstraint = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.userIdConstraint)()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.userEmailConstraint)().then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, exports.bookIdIndex)();
        }));
    }))
        .catch((error) => console.log('Error:', error));
});
exports.initiateUserConstraint = initiateUserConstraint;
// ** requires enterprise version
const loggerIndexConstraint = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
      CREATE CONSTRAINT ON (book:Book) ASSERT UNIQUE (book)<-[:LOGGED]-(log:Log) ASSERT log.index IS UNIQUE
      `);
});
exports.loggerIndexConstraint = loggerIndexConstraint;
