import express from 'express';

import { authMiddleware } from '../../middleware/auth';
import { bookCoverUploader, contentImageUploader } from '../../lib/imageUploader';
import {
	uploadBookCoverImage,
	uploadImageInContent,
	write,
	getPostsByUserId,
	getPostByPostId,
	updatePost,
	deletePost
} from './post.ctrl';

const router = express.Router();

router.post(
	'/bookCoverImage',
	bookCoverUploader.single('imgFile'),
	uploadBookCoverImage
);
router.post(
	'/contentImage',
	contentImageUploader.single('imgFile'),
	uploadImageInContent
);
router.post('/', authMiddleware, write);
router.put('/', authMiddleware, updatePost);
router.delete('/', authMiddleware, deletePost);
router.get('/user_id', getPostsByUserId);
router.get('/post_id', getPostByPostId);

export default router;
