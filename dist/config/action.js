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
exports.write = exports.read = void 0;
const driver_1 = __importDefault(require("./driver"));
const read = (cypher, param) => __awaiter(void 0, void 0, void 0, function* () {
    const session = driver_1.default.session();
    try {
        const res = yield session.executeRead((tx) => tx.run(cypher, param));
        // const result = res.records.map((record: Record) => record.toObject());
        return res;
    }
    catch (err) {
        console.log(`Query failed from ${err}`);
        return {};
    }
    finally {
        yield session.close();
    }
});
exports.read = read;
const write = (cypher, param) => __awaiter(void 0, void 0, void 0, function* () {
    const session = driver_1.default.session();
    try {
        const res = yield session.executeWrite((tx) => tx.run(cypher, param));
        const result = res.records.map((record) => record.toObject());
        return result;
    }
    catch (err) {
        console.log(`Session cannot write cypher ${err}`);
    }
    finally {
        yield session.close();
    }
});
exports.write = write;
// TODO:
// Can be better if writing a class after understanding neo4j a bit more?
// have to write when neo4j database comes back as
// 1) lists of objects, 2) lists of array 3) string 4) integer/float/number
// and create a class from the mentioned output
// also with transaction: look iunto the JS driver
// https://github.com/neo4j/neo4j-javascript-driver#a-note-on-numbers-and-the-integer-type
