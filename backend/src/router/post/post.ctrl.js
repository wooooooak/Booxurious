export const uploadImage = (req, res) => {
  let imgFile = req.file;
  res.json(imgFile);
};

export const write = (req, res) => {
  console.log(req.body);
  res.json(req.body);
};
