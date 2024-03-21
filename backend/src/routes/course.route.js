const express = require('express');
const router = express.Router();
const { courseController } = require('../controllers');
const validate = require('../middlewares/validate');
const { courseValidation } = require('../validations');

router
  .route('/')
  .post(validate(courseValidation.createCourse), courseController.createCourse);

router
  .route('/:courseId')
  .put(
    validate(courseValidation.updateCourseById),
    courseController.updateCourseById
  )
  .delete(
    validate(courseValidation.deleteCourseById),
    courseController.deleteCourseById
  )
  .get(
    validate(courseValidation.getCourseById),
    courseController.getCourseById
  );

module.exports = router;
