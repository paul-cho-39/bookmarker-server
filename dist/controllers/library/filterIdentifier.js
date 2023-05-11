"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookFilter {
    constructor(data) {
        this.categories = data === null || data === void 0 ? void 0 : data.volumeInfo.categories;
        this.authors = data === null || data === void 0 ? void 0 : data.volumeInfo.authors;
        this.industryIdentifiers = data === null || data === void 0 ? void 0 : data.volumeInfo.industryIdentifiers;
    }
    get getBookCategories() {
        const categories = this._categorize(this.categories);
        if (categories) {
            return Array.from(categories);
        }
    }
    get getIndustryIdentifiers() {
        const industryIdentifiers = this.industryIdentifiers;
        this._isDataAvailable(industryIdentifiers);
        return this._parseIdentifier(this._createIdentifierObject(industryIdentifiers));
    }
    get getAvailableThumbnail() {
        return this._prioritizeImage;
    }
    //   filter for images
    _prioritizeImage(imageLinks) {
        this._isDataAvailable(imageLinks);
        const priority = imageLinks.medium;
        return priority ? priority : !imageLinks.small ? imageLinks.thumbnail : imageLinks.small;
    }
    //    filters for identifiers
    _parseIdentifier(identifierObject) {
        const isbnTen = identifierObject['ISBN_10'];
        const isbnThirteen = identifierObject['ISBN_13'];
        return {
            isbnTen,
            isbnThirteen,
        };
    }
    _createIdentifierObject(identifiers) {
        return identifiers.reduce((result, identifier) => {
            result[identifier.type] = identifier.identifier;
            return result;
        }, {});
    }
    //  mapping categories can be used for later when decoding and creating a graph?
    // filters for categories
    _categorize(categories) {
        this._isDataAvailable(categories);
        const mappedCategories = new Map();
        const sectionStore = new Set();
        return categories === null || categories === void 0 ? void 0 : categories.map((category) => {
            return this._mapCategories(category, sectionStore, mappedCategories);
        })[0];
    }
    _mapCategories(category, sectionStore, 
    // map: Map<unknown, unknown>
    map) {
        const { main, section } = this._splitCategories(category);
        const hasMain = map === null || map === void 0 ? void 0 : map.has(main);
        function attachToSet(main) {
            const prevSection = map.get(main);
            prevSection && sectionStore.add(prevSection.toString());
            sectionStore.add(section);
            map.set(main, [...sectionStore]);
        }
        map.size < 1 || !hasMain ? map.set(main, [section]) : attachToSet(main);
        return map;
    }
    _splitCategories(category, keepSection = false) {
        const total = category.split('/');
        const main = total[0].trim();
        const section = total.splice(1).join('').replace('  ', ' / ').trim();
        return {
            main,
            section,
        };
    }
    _isDataAvailable(bookData) {
        if (!bookData)
            return;
    }
    _converDataString(str) {
        return str.trim().toLocaleLowerCase();
    }
}
exports.default = BookFilter;
// i dont think this part has to be used
// there is no good reason to put in "code" if it does not even work?
//    private _getListofBookCode(categories: string[] | undefined) {
//       if (!categories) return;
//       const codes = categories.map((category) => {
//          return this._getBookCode(category);
//       });
//    }
//    private _getBookCode(category: string, categoryStore?: string[]) {
//       if (!category) return;
//       const { main, section } = this._splitCategories(category);
//       const matchedTitle = this._matchTitle(main, BookCatalogue.categories);
//       return this._matchSection(section, matchedTitle);
//    }
//    private _matchTitle(main: string, data: BookCatalogueProps) {
//       const mainConverted = this._converDataString(main);
//       const matchTitle = data.find((cat) => this._converDataString(cat.title) == mainConverted);
//       return matchTitle;
//    }
//    private _matchSection(match: string, section: ReturnType<BookFilter['_matchTitle']>) {
//       if (!section) {
//          console.log('Title could not be found');
//       }
//       match = this._converDataString(match);
//       // have to split the section name and loop over and at this point
//       // it is not worth the hassle of finding the code number
//       const name = this._converDataString(section?.name);
//       console.log('The section we are looking for: ', match);
//       console.log('Name from the data secion:', name);
//       const matchedSection = name.includes(match);
//       const matchedSection2 = name == match;
//       console.log('1) is it matched?', matchedSection);
//       console.log('2) is it matched?', matchedSection2);
//    }
// }
