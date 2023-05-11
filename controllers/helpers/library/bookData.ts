import { Items } from '../../types/books';
import Book from './bookFilter';

export default function filterBookData(book: Items<Record<string, string>>) {
   const id = book.id;
   const bookInfo = book.volumeInfo;
   // console.log('categories: ', bookInfo.categories);
   const filterer = new Book(book);
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
         isbn_10: isbn?.isbnTen,
         isbn_13: isbn?.isbnThirteen,
      },
      categories: categories,
      authors: authors,
   };
}
