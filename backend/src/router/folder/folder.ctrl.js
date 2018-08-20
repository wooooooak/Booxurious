export const uploadCoverImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};
