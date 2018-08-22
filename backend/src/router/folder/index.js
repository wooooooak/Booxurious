import express from 'express';

import { authMiddleware } from '../../middleware/auth';
import { uploadCoverImage, makeNewFolder } from './folder.ctrl';
import { folderCoverImageUploader } from '../../lib/imageUploader';

const folder = express.Router();

folder.post(
  '/folderCoverImage',
  authMiddleware,
  folderCoverImageUploader.single('imgFile'),
  uploadCoverImage
);

folder.post('/newFolder', authMiddleware, makeNewFolder);

export default folder;
