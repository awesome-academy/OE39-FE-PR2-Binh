import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import { isAuth } from '../utils/authMiddleware.js';
import { uploadMultipleFile, uploadSingleFile } from '../controllers/uploadController.js';

dotenv.config();

const uploadRouter = express.Router();

aws.config.update({
  accessKeyId: process.env.ACCESSS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESSS_KEY,
});

const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: 'huubinh-bucket',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadS3 = multer({ storage: storageS3 });

uploadRouter.post('/s3/single', uploadS3.single('media'), isAuth, uploadSingleFile);

uploadRouter.post('/s3/multiple', uploadS3.array('media'), isAuth, uploadMultipleFile);

export default uploadRouter;
