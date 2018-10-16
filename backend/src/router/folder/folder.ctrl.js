import Folder from "../../db/model/Folder";
import Category from "../../db/model/Category";
import User from "../../db/model/User";
import { dumper } from "dumper";

export const uploadCoverImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};

export const makeNewFolder = async (req, res) => {
  const { userId } = req.decodedUser;
  const { folderName, folderCoverImage, category } = req.body;
  try {
    const machedCategory = await Category.findOrCreate({ where: { name: category } });
    const user = await User.findOne({ where: { id: userId } });
    const folder = await Folder.create({ folderName, folderCoverImage });
    await folder.setCategory(machedCategory[0]);
    await folder.setUser(user);
    await folder.save();
    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const myFolderList = async (req, res) => {
  const { userId } = req.decodedUser;
  try {
    const FolderList = await Folder.findAll({ where: { fk_user_id: userId } });
    res.json(FolderList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteFolder = async (req, res) => {
  const { userId } = req.decodedUser;
};
