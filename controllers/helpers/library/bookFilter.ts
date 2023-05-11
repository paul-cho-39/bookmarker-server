import { ImageLinks, ImageLinksPairs, Items } from '../../types/books';

interface Identifier {
   identifier: string;
   type: string;
}
type ImageLinkType = Partial<ImageLinks>;

export default class BookFilter {
   data: Items<Record<string, string>> | undefined;
   categories: string[] | undefined;
   authors: string[] | undefined;
   industryIdentifiers: Identifier[] | undefined;
   imageLinks?: ImageLinks | ImageLinksPairs | undefined;
   constructor(data: Items<Record<string, string>>) {
      this.categories = data?.volumeInfo.categories;
      this.authors = data?.volumeInfo.authors;
      this.imageLinks = data?.volumeInfo.imageLinks;
      this.industryIdentifiers = data?.volumeInfo.industryIdentifiers;
   }
   get getAll() {
      const authors = this.getAuthor;
      const industryIdentifiers = this.getIndustryIdentifiers;
      const thumbnail = this.getAvailableThumbnail;
      const categories = this.getBookCategories;
      return {
         authors,
         industryIdentifiers,
         thumbnail,
         categories,
      };
   }
   get getAvailableThumbnail() {
      return this._prioritizeImage(this.imageLinks);
   }
   private get getBookCategories() {
      const categories = this._categorize(this.categories);
      if (categories) {
         return Array.from(categories);
      }
   }
   private get getIndustryIdentifiers() {
      const industryIdentifiers = this.industryIdentifiers;
      this._isDataAvailable(industryIdentifiers);
      return this._parseIdentifier(
         this._createIdentifierObject(industryIdentifiers as Identifier[])
      );
   }
   private get getAuthor() {
      return this.authors?.map((author) => this._converDataString(author));
   }
   //   filter for images
   _prioritizeImage(imageLinks: ImageLinkType | undefined) {
      this._isDataAvailable(imageLinks);
      const priority = imageLinks?.medium;
      return priority ? priority : !imageLinks?.small ? imageLinks?.thumbnail : imageLinks.small;
   }
   //    filters for identifiers
   private _parseIdentifier(identifierObject: ReturnType<BookFilter['_createIdentifierObject']>) {
      const isbnTen = identifierObject['ISBN_10'];
      const isbnThirteen = identifierObject['ISBN_13'];
      return {
         isbnTen,
         isbnThirteen,
      };
   }
   private _createIdentifierObject(identifiers: Identifier[]): { [key: string]: string } {
      return identifiers.reduce((result, identifier) => {
         result[identifier.type] = identifier.identifier;
         return result;
      }, {} as { [key: string]: string });
   }
   //  mapping categories can be used for later when decoding and creating a graph?
   // filters for categories
   private _categorize(categories: string[] | undefined) {
      this._isDataAvailable(categories);
      const mappedCategories = new Map();
      // const sectionStore = new Set<string>();

      return categories?.map((category: string) => {
         return this._mapCategories(category, mappedCategories);
      })[0];
   }
   private _mapCategories(
      category: string,
      // sectionStore: Set<string>,
      map: Map<string, Set<string> | string[]>
   ) {
      const { main, section } = this._splitCategories(category);
      const sectionStore = new Set<string>();
      const hasMain = map?.has(main);

      function attachToSet(main: string) {
         const prevSection = map.get(main);
         prevSection && sectionStore.add(prevSection.toString());
         sectionStore.add(section);
         map.set(main, [...sectionStore]);
      }

      map.size < 1 || !hasMain ? map.set(main, [section]) : attachToSet(main);

      return map;
   }
   private _splitCategories(category: string, keepSection: boolean = false) {
      const total = category.split('/');
      const main = this._converDataString(total[0]);
      const section = this._converDataString(total.splice(1).join('').replace('  ', ' / '));

      return {
         main,
         section,
      };
   }
   private _isDataAvailable<T>(bookData: T) {
      if (!bookData) return;
   }
   private _converDataString(str: string) {
      return str.trim().toLocaleLowerCase();
   }
}

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
