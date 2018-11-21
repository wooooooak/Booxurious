import express from "express";

import { authMiddleware } from "../../middleware/auth";
import { uploadCoverImage, makeNewFolder, myFolderList, deleteFolder, test, test2 } from "./folder.ctrl";
import { folderCoverImageUploader } from "../../lib/imageUploader";

const folder = express.Router();

folder.post(
  "/folderCoverImage",
  authMiddleware,
  folderCoverImageUploader.single("imgFile"),
  uploadCoverImage
);

folder.post("/newFolder", authMiddleware, makeNewFolder);
folder.get("/myList", authMiddleware, myFolderList);
folder.delete("/", authMiddleware, deleteFolder);

export default folder;
