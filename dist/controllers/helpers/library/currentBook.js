"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CurrentBookFilter {
    constructor(data) {
        this.data = data;
    }
    get getCurrentBooks() {
        this.data.forEach((book) => {
            book.authors = this._capitalizeAuthors(book.authors);
            book.date = this._toDate(book.date);
        });
        return this.data;
    }
    _capitalizeAuthors(authors) {
        return authors.map((author) => author
            .split(' ')
            .map((word) => word.replace(/^\w|\b\w/g, (c) => c.toUpperCase()))
            .join(' '));
    }
    _toDate(date) {
        var _a, _b;
        const [year, month, day] = (_b = (_a = date.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.map(Number)) !== null && _b !== void 0 ? _b : [];
        return new Date(year, month - 1, day);
    }
    shuffleData() {
        const data = new CurrentBookFilter(this.data);
        const unshuffledBooks = data.getCurrentBooks;
        const primaryIndex = unshuffledBooks.findIndex((book) => book.type === 'PRIMARY');
        if (primaryIndex >= 0) {
            unshuffledBooks.splice(1, 0, this.data.splice(primaryIndex, 1)[0]);
        }
        // this is for the book carousel to work
        // else the primaryBook should be the main book to be displayed
        unshuffledBooks.push(this._dummyData());
        unshuffledBooks.unshift(this._dummyData());
        return unshuffledBooks;
    }
    _dummyData() {
        const dummyData = {
            id: '',
            title: '',
            subtitle: '',
            thumbnail: '',
            date: '',
            type: 'DUMMY',
            authors: [],
        };
        return dummyData;
    }
}
exports.default = CurrentBookFilter;
