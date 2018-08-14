export const uploadImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};
