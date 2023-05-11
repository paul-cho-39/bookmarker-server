import BookWrite from '../../model/library/write/bookWrite';
import filterBookData from '../helpers/library/bookData';

export type BookData = ReturnType<typeof filterBookData>;

export type FinishedBookUpdateProps = BookData & {
   year?: number;
   month?: number;
   day?: number;
};

export interface Items<T extends Record<string, string>> {
   accessInfo?: T;
   readonly etag?: string;
   id: string;
   readonly kind?: string;
   saleInfo?: T;
   searchInfo?: T;
   readonly selfLink: string;
   volumeInfo: VolumeInfo;
}

export type VolumeInfo = {
   authors: string[];
   averageRating?: number;
   categories?: string[];
   pageCount?: number;
   publishedDate?: string;
   publisher?: string;
   subtitle?: string;
   title: string;
   imageLinks?: ImageLinks | ImageLinksPairs;
   language?: string;
   industryIdentifiers?: IndustryIdentifiers[];
};

export type IndustryIdentifiers = {
   type: 'ISBN_10' | 'ISBN-13' | 'ISSN' | 'OTHER';
   identifier: string;
};

export type ImageLinks = {
   extraLarge: string;
   large: string;
   medium: string;
   small: string;
   smallThumbnail: string;
   thumbnail: string;
};

export type ImageLinksPairs = Pick<ImageLinks, 'thumbnail' | 'smallThumbnail'>;

export type Library = {
   finished: string[] | undefined;
   unfinished: string[] | undefined;
   wantToRead: string[] | undefined;
   currentlyReading: string[] | undefined;
}[];

export type BookRelationTypes =
   | 'CURRENTLY_READING'
   | 'WANT_TO_READ'
   | 'FINISHED'
   | 'FINISHED:REREADING';

export type BookAction = 'edit' | 'finished' | 'remove';
