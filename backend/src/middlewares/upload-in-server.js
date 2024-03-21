const multer = require('multer');
const ApiError = require('../utils/ApiError');

const   fileFilter = (req, file, callback) => {
  // Check if the MIME type starts with 'image/' or 'video/'
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      callback(null, true); // Accept the file
  } else {
      callback(new ApiError('Only images or videos are allowed')); // Reject the file
  }
}
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },

});

const upload = multer({ storage, fileFilter });

module.exports = upload;
