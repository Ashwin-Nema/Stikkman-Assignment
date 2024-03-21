const catchAsync = require('../utils/catchAsync');
const { courseService } = require('../services');
const httpStatus = require('http-status');

const createCourse = catchAsync(async (req, res) => {
  await courseService.createCourse(req.body);
  res.status(httpStatus.CREATED).send({
    message: 'Course created successfully',
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const data = await courseService.getAllCoursesByFltr(req);
  res.send(data);
});

const updateCourseById = catchAsync(async (req, res) => {
  const data = await courseService.updateCourseById(
    req.params.courseId,
    req.body
  );
  res.send(data);
});

const deleteCourseById = catchAsync(async(req, res) => {
  await courseService.deleteCourseById(req.params.courseId)
  res.status(httpStatus.NO_CONTENT).send();
})

const getCourseById = catchAsync(async(req, res) => {
  const data = await courseService.getCourseById(req.params.courseId);
  res.send(data)
})

module.exports = { createCourse, getAllCourses, updateCourseById, deleteCourseById, getCourseById };
