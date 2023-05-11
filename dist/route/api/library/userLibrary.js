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
const library_1 = require("../../../controllers/library");
const router = express_1.default.Router();
router.use(['/:uid/:id/reading', '/:uid/:id/finished/rereading'], library_1.selectPrimary);
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
    const isRemove = route.action === 'remove';
    isRemove
        ? router.delete(url, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, library_1.bookHandler)(req, res, next, action, props);
        }))
        : router.post(url, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, library_1.bookHandler)(req, res, next, action, props);
        }));
});
exports.default = router;
