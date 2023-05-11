"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const editPrimary_1 = __importDefault(require("../../../middleware/library/editPrimary"));
const addBookHandler_1 = __importDefault(require("../../../middleware/library/addBookHandler"));
const router = express_1.default.Router();
router.use(['/:uid/:id/reading', '/:uid/:id/finished/rereading'], editPrimary_1.default);
const routes = [
    { url: '/:uid/:id/reading', props: 'CURRENTLY_READING', action: 'edit' },
    { url: '/:uid/:id/want', props: 'WANT_TO_READ', action: 'edit' },
    { url: '/:uid/:id/finished', props: 'FINISHED', action: 'edit' },
    { url: '/:uid/:id/finished/rereading', props: 'FINISHED:CURRENTLY_READING', action: 'edit' },
    { url: '/:uid/:id/finished/dates', props: null, action: 'finished' },
    { url: '/:uid/:id/remove', props: null, action: 'remove' },
];
routes.forEach((route) => {
    const { url, props, action } = route;
    router.post(url, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, addBookHandler_1.default)(req, res, next, action, props);
    }));
});
// DELETE THIS AFTER CONFIRMING THAT IT WORKS
// type EditBooksProps = typeof editBooks;
// <Func extends FinishedOrEditType>
// async function postHandler(
//    req: Request,
//    res: Response,
//    next: NextFunction,
//    handler: 'edit' | 'finished',
//    // handler: PostHandlerFunc<Func>,
//    relType?: BookRelationTypes
// ) {
//    console.log('processing data');
//    const { uid, id } = req.params;
//    const googleData = req.googleData;
//    const data = filterBookData(googleData);
//    const bookWrite = new BookWrite(uid, data);
//    try {
//       handler === 'edit'
//          ? await bookWrite.editBook(relType as BookRelationTypes)
//          : await bookWrite.getFinishedDates();
//       // await func(uid, data, relType as BookRelationTypes);
//       await bookWrite.createAuthors();
//       await bookWrite.createCategories();
//       console.log('successfully created a book or edited a book');
//       res.status(200).json({ status: true, message: 'Added to currently reading' });
//    } catch (err) {
//       next(err);
//    }
// }
// // possible changes: change /finished/rereading ->
// const routes = [
//    { url: '/:uid/:id/reading', props: 'CURRENTLY_READING', handler: 'edit' },
//    { url: '/:uid/:id/want', props: 'WANT_TO_READ', handler: 'edit' },
//    { url: '/:uid/:id/finished', props: 'FINISHED', handler: 'edit' },
//    { url: '/:uid/:id/finished/rereading', props: 'FINISHED:CURRENTLY_READING', handler: 'edit' },
//    { url: '/:uid/:id/finished/dates', props: null, handler: 'finished' },
// ];
// routes.forEach((route) => {
//    const { url, props, handler } = route;
//    router.post(url, async (req: Request, res: Response, next: NextFunction) => {
//       await postHandler(req, res, next, handler as 'edit' | 'finished', props as BookRelationTypes);
//    });
// });
// router.post('/reading', async (req, res) => {
//    await postHandler(req, res, editBooks, 'CURRENTLY_READING');
// });
exports.default = router;
