// import { Request, Response, NextFunction } from 'express';
// import { updatePageRead } from '../../../model/library/write/editBook';

// // updates the page separately from the logic of API editBookHandler
// async function addPage(req: Request, _res: Response, next: NextFunction) {
//     const { currentPage } = req.body;
//     const parsedPage = parseInt(currentPage);
//     if (parsedPage && parsedPage > 0) {
//         // create where it will add the bookCount that is CURRENTLY_READING
//         updatePageRead()
//     }
//     next();

// }

// export default addPage;
