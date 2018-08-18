'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.uploadImageInContent = exports.uploadBookCoverImage = undefined;

var _Post = require('../../db/model/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadBookCoverImage = exports.uploadBookCoverImage = function uploadBookCoverImage(req, res) {
  var imgFile = req.file;
  res.json(imgFile);
};
var uploadImageInContent = exports.uploadImageInContent = function uploadImageInContent(req, res) {
  var imgFile = req.file;
  res.status(200).json(imgFile);
};

var write = exports.write = async function write(req, res) {
  var _req$body = req.body,
      postTitle = _req$body.postTitle,
      subTitle = _req$body.subTitle,
      editorState = _req$body.editorState,
      bookCoverImg = _req$body.bookCoverImg;

  try {
    var post = await _Post2.default.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};