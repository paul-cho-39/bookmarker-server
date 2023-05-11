"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookFilter_1 = __importDefault(require("./bookFilter"));
function filterBookData(book) {
    const id = book.id;
    const bookInfo = book.volumeInfo;
    // console.log('categories: ', bookInfo.categories);
    const filterer = new bookFilter_1.default(book);
    const { authors, industryIdentifiers: isbn, thumbnail: images, categories } = filterer.getAll;
    return {
        data: {
            id: id,
            thumbnail: images,
            averageRating: bookInfo.averageRating,
            pageCount: bookInfo.pageCount,
            publishedDate: bookInfo.publishedDate,
            publisher: bookInfo.publisher,
            subtitle: bookInfo.subtitle,
            title: bookInfo.title,
            language: bookInfo.language,
            isbn_10: isbn === null || isbn === void 0 ? void 0 : isbn.isbnTen,
            isbn_13: isbn === null || isbn === void 0 ? void 0 : isbn.isbnThirteen,
        },
        categories: categories,
        authors: authors,
    };
}
exports.default = filterBookData;
