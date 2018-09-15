import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import path from 'path';

import { aws_config } from '../config';

AWS.config.accessKeyId = process.env.AWS_KEY;
AWS.config.secretAccessKey = process.env.AWS_SECRET;
AWS.config.region = 'ap-northeast-2';

const s3 = new AWS.S3();
// myBucket의 이름에 해당하는 폴더가 없다면 자동으로 만들어줌!
const bookCoverBucket = 'elebooks-image/book-cover';
const folderCoverBucket = 'elebooks-image/folder-cover';
const contentImageBucket = 'elebooks-image/content-image';

export const bookCoverUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: bookCoverBucket,
    key: function (req, file, cb) {
      console.log('mullter~!~!~!~!~!~!~!~!~!~!~!~!');
      console.log(req.body);
      let extension = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, extension) + Date.now().toString() + extension
      );
    },
    acl: 'public-read-write'
  })
});

export const contentImageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: contentImageBucket,
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, extension) + Date.now().toString() + extension
      );
    },
    acl: 'public-read-write'
  })
});

export const folderCoverImageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: folderCoverBucket,
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, extension) + Date.now().toString() + extension
      );
    },
    acl: 'public-read-write'
  })
});
