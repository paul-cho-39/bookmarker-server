"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSection = void 0;
const book_category_json_1 = __importDefault(require("./../../config/book-category.json"));
function findSection(main, section) {
    main = main.trim().toUpperCase();
    section = section.trim();
    const data = book_category_json_1.default.categories;
    const matchTitle = data.find((cat) => cat.title.trim() == main);
    if (!matchTitle) {
        console.log('did not match any title, [Error: if logged]');
        return;
    }
    //    console.log(
    //       'Here we can determine if we can push matchSection, which can be used for memozing',
    //       matchTitle.section
    //    );
    //    const matchSection = _find(matchTitle.section, section, 'name');
    //    return matchSection.code;
    //    return BookCategoryData.categories.find((cat) => cat.title === section);
}
exports.findSection = findSection;
