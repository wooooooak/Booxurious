import express from "express";

import { authMiddleware } from "../../middleware/auth";
import { bookCoverUploader, contentImageUploader } from "../../lib/imageUploader";
import { uploadBookCoverImage, uploadImageInContent, write, getData } from "./post.ctrl";

const router = express.Router();

router.post("/bookCoverImage", bookCoverUploader.single("imgFile"), uploadBookCoverImage);
router.post("/contentImage", contentImageUploader.single("imgFile"), uploadImageInContent);
router.post("/", authMiddleware, write);
router.get("/", getData);

export default router;
