import Post from '../../db/model/Post';
import User from '../../db/model/User';
import Category from '../../db/model/Category';

export const uploadBookCoverImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};
export const uploadImageInContent = (req, res) => {
  let imgFile = req.file;
  res.status(200).json(imgFile);
};

export const write = async (req, res) => {
  const { category } = req.body;
  const { userId: fk_user_id } = req.decodedUser;
  try {
    const machedCategory = await Category.findOrCreate({ where: { name: category } });
    const user = await User.find({ where: { id: fk_user_id } });
    const post = await Post.create(req.body);
    await post.setUser(user);
    await post.setCategory(machedCategory[0]);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
