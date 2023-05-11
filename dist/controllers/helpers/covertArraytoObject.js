"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArrayIntoObject = void 0;
function convertArrayIntoObject(arr) {
    return arr.reduce((obj, item) => {
        Object.keys(item).forEach((key) => {
            obj[key] = item[key];
        });
        return obj;
    }, {});
}
exports.convertArrayIntoObject = convertArrayIntoObject;
