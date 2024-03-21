const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const serverUpload = require('../middlewares/upload-in-server');
const { removeUploadedFile } = require('../utils/misc');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

router.post(
  '/upload',
  serverUpload.single('upload'),
  async (req, res, next) => {
    try {
      const uploadedUrl = await cloudinary.uploader.upload(req?.file?.path);
      removeUploadedFile(req?.file?.path);
      return res.status(httpStatus.OK).json({
        url: uploadedUrl.url,
        message: 'Url Uploaded successfully',
      });
    } catch (err) {
      removeUploadedFile(req?.file?.path);
      throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
  }
);

module.exports = router;
