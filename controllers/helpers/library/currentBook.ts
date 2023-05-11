// subject to change the name for this
import { CurrentBookResult } from '../../types/read';

class CurrentBookFilter {
   data: CurrentBookResult[];
   constructor(data: CurrentBookResult[]) {
      this.data = data;
   }
   get getCurrentBooks() {
      this.data.forEach((book) => {
         book.authors = this._capitalizeAuthors(book.authors);
         book.date = this._toDate(book.date as string);
      });
      return this.data;
   }
   private _capitalizeAuthors(authors: string[]) {
      return authors.map((author) =>
         author
            .split(' ')
            .map((word) => word.replace(/^\w|\b\w/g, (c) => c.toUpperCase()))
            .join(' ')
      );
   }
   private _toDate(date: string) {
      const [year, month, day] = date.match(/\d+/g)?.map(Number) ?? [];
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
   private _dummyData() {
      const dummyData = {
         id: '',
         title: '',
         subtitle: '',
         thumbnail: '',
         date: '',
         type: 'DUMMY' as CurrentBookResult['type'],
         authors: [],
      };
      return dummyData;
   }
}

export default CurrentBookFilter;
