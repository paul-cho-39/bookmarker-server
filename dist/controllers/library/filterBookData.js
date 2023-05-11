"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookFilter_1 = __importDefault(require("./bookFilter"));
function filterBookData(book) {
    if (!book)
        return;
    const id = book.id;
    const bookInfo = book.volumeInfo;
    const filterer = new bookFilter_1.default(book);
    const isbn = filterer.getIndustryIdentifiers;
    const images = filterer.getAvailableThumbnail;
    const categories = filterer.getBookCategories;
    console.log(categories);
    console.log('typeof categories is', typeof categories);
    return {
        data: {
            id: id,
            authors: bookInfo.authors,
            averageRating: bookInfo.averageRating,
            pageCount: bookInfo.pageCount,
            publishedDate: bookInfo.publishedDate,
            publisher: bookInfo.publisher,
            subtitle: bookInfo.subtitle,
            title: bookInfo.title,
            thumbnail: images,
            language: bookInfo.language,
            isbn_10: isbn === null || isbn === void 0 ? void 0 : isbn.isbnTen,
            isbn_13: isbn === null || isbn === void 0 ? void 0 : isbn.isbnThirteen,
        },
        categories: categories,
    };
}
exports.default = filterBookData;
