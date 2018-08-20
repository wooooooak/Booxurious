import Post from '../../db/model/Post';
import { dumper } from 'dumper';

export const uploadBookCoverImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};
export const uploadImageInContent = (req, res) => {
  let imgFile = req.file;
  res.status(200).json(imgFile);
};

export const write = async (req, res) => {
  const { postTitle, subTitle, editorState, bookCoverImg } = req.body;
  const { userId: fk_user_id } = req.decodedUser;
  const postData = { postTitle, subTitle, editorState, bookCoverImg, fk_user_id };
  try {
    const post = await Post.create(postData);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
