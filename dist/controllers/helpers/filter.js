"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_category_json_1 = __importDefault(require("./../../constants/book-category.json"));
// THIS PAGE IS STILL EXPERIMENTAL AND MAY NOT BE USED
function split(category) {
    const categoryArray = category.split(' / ');
    const section = categoryArray.slice(1);
    // General
    // Finance & Business, Money
    // have this in another file
    // change this*
    const defaultCode = book_category_json_1.default.categories[0].section[0].code;
    const found = new Map(); // should this be an array or no?
    const convertDataString = (str) => {
        return str.trim().toLocaleLowerCase();
    };
    // split off the data basically from the class filters
    const data = book_category_json_1.default.categories;
    for (let sec in section) {
        // if the string equals then return the code
        // else we narrow it down
        if (section.length > 2 && found.size < 1) {
            for (let i = 0; i < section.length - 1; i++) {
                // use for loops and push the result then join later?
                if (data[0].section[0].name.includes(convertDataString(sec))) {
                    // then use Map to map over index too?
                    // this is to know the order
                    found.set(i, sec);
                }
                // a function to decode the array
                // should it be a map?
                return found;
            }
        }
        // if non or length is less than 2 then return "General"
        return defaultCode;
    }
}
// after all of this have to decode it back;
