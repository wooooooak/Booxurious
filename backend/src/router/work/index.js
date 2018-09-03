import express from 'express';

import { authMiddleware } from '../../middleware/auth';
import { getWorkListRelatedFolder, createWork, deleteWork } from './work.ctrl';

const work = express.Router();

work.get('/list', getWorkListRelatedFolder);
work.post('/', authMiddleware, createWork);
work.delete('/', authMiddleware, deleteWork);

export default work;
