import express from 'express';
import { uploadCoverImage } from './folder.ctrl';
import { folderCoverImageUploader } from '../../lib/imageUploader';

const folder = express.Router();

folder.post(
  '/folderCoverImage',
  folderCoverImageUploader.single('imgFile'),
  uploadCoverImage
);

export default folder;
