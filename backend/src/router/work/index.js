import express from 'express';

import { authMiddleware } from '../../middleware/auth';
import { getWorkListRelatedFolder, createWork } from './work.ctrl';

const work = express.Router();

work.get('/list', getWorkListRelatedFolder);
work.post('/newWork', authMiddleware, createWork);

export default work;
