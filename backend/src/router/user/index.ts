import * as express from 'express';
import { test } from './user.ctrl';

const router = express.Router();

router.get('/test', test);

export default router;
