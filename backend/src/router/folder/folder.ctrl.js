import Folder from '../../db/model/Folder';
import Category from '../../db/model/Category';
import User from '../../db/model/User';
import { dumper } from 'dumper';

export const uploadCoverImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};

export const makeNewFolder = async (req, res) => {
  const { userId } = req.decodedUser;
  const { folderName: name, folderCoverImage: coverImage, category } = req.body;
  try {
    const machedCategory = await Category.findOrCreate({ where: { name: category } });
    const user = await User.findOne({ where: { id: userId } });
    // console.log(user);
    const folder = await Folder.create({ name, coverImage });
    await folder.setCategory(machedCategory[0]);
    await folder.setUser(user);
    await folder.save();
    res.status(200).json(folder);
  } catch (error) {
    console.log(error);
    res.status(500).json(machedCategory);
  }
};
