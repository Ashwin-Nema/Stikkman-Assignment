const express = require('express');
const router = express.Router();
const { courseController } = require('../controllers');
const validate = require('../middlewares/validate');
const { courseValidation } = require('../validations');

router.route('/').get(courseController.getAllCourses);
router.get(
    '/filter-by-authors',
    validate(courseValidation.getCoursesByAuthor),
    courseController.getAllCourses
  );
module.exports = router;
