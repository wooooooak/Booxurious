import express from 'express';

import { authMiddleware } from '../../middleware/auth';
import { bookCoverUploader, contentImageUploader } from '../../lib/imageUploader';
import { uploadBookCoverImage, uploadImageInContent, write } from './post.ctrl';

const router = express.Router();

router.post('/bookCoverImage', bookCoverUploader.single('imgFile'), uploadBookCoverImage);
router.post('/contetImage', contentImageUploader.single('imgFile'), uploadImageInContent);
router.post('/write', authMiddleware, write);

export default router;
