import express, { Request } from 'express';
import logs from './mainLog';

const router = express.Router();

router.use('/book-log', logs);

export default router;
