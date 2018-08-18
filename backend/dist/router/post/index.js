'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _post = require('./post.ctrl');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.accessKeyId = _config.aws_config.aws_access_key_id;
_awsSdk2.default.config.secretAccessKey = _config.aws_config.aws_secret_access_key;
_awsSdk2.default.config.region = _config.aws_config.aws_region;

var s3 = new _awsSdk2.default.S3();
// myBucket의 이름에 해당하는 폴더가 없다면 자동으로 만들어줌!
var bookCoverBucket = 'elebooks-image/book-cover';
var contentImageBucket = 'elebooks-image/content-image';
var bookCoverUpload = (0, _multer2.default)({
  storage: (0, _multerS2.default)({
    s3: s3,
    bucket: bookCoverBucket,
    key: function key(req, file, cb) {
      var extension = _path2.default.extname(file.originalname);
      cb(null, _path2.default.basename(file.originalname, extension) + Date.now().toString());
    },
    acl: 'public-read-write'
  })
});
var contentImageUpload = (0, _multer2.default)({
  storage: (0, _multerS2.default)({
    s3: s3,
    bucket: contentImageBucket,
    key: function key(req, file, cb) {
      var extension = _path2.default.extname(file.originalname);
      cb(null, _path2.default.basename(file.originalname, extension) + Date.now().toString());
    },
    acl: 'public-read-write'
  })
});

var router = _express2.default.Router();

router.post('/bookCoverImage', bookCoverUpload.single('imgFile'), _post.uploadBookCoverImage);
router.post('/contetImage', contentImageUpload.single('imgFile'), _post.uploadImageInContent);
router.post('/write', _post.write);

exports.default = router;