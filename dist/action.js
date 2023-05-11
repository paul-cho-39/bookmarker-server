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
// import driver from './driver';
const driver = require('./driver');
// test records.recordthe
const read = (cypher, param) => __awaiter(void 0, void 0, void 0, function* () {
    const session = driver.session();
    try {
        // console.log('is session read', session);
        const res = yield session.executeRead((tx) => tx.run(cypher, param));
        // const result = res.records[0].get(0)
        const result = res.records.map((record) => record.toObject());
        return result;
    }
    catch (err) {
        console.log(`Query failed from ${err}`);
    }
    finally {
        yield session.close();
    }
});
const write = (cypher, param) => __awaiter(void 0, void 0, void 0, function* () {
    const session = drive.session();
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
exports.read = read;
exports.write = write;
