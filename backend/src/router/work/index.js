import express from 'express';
import { getWorkListRelatedFolder } from './work.ctrl';

const work = express.Router();

work.get('/list', getWorkListRelatedFolder);

export default work;
