import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import path from 'path';

import { uploadImage } from './post.ctrl';

import { aws_config } from '../../config';

AWS.config.accessKeyId = aws_config.aws_access_key_id;
AWS.config.secretAccessKey = aws_config.aws_secret_access_key;
AWS.config.region = aws_config.aws_region;

const s3 = new AWS.S3();
// myBucket의 이름에 해당하는 폴더가 없다면 자동으로 만들어줌!
const myBucket = 'elebooks-image/book-cover';

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, extension) + Date.now().toString());
    },
    acl: 'public-read-write'
  })
});

const router = express.Router();

router.post('/uploadImage', upload.single('imgFile'), uploadImage);

export default router;
