import Post from '../../db/model/Post';

export const uploadImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};

export const write = async (req, res) => {
  const { postTitle, subTitle, editorState, bookCoverImg } = req.body;
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
