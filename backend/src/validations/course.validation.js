const Joi = require('joi');

const createCourse = {
  body: Joi.object().keys({
    thumbnail: Joi.string().required(),
    name: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().allow(''),
    creation_date: Joi.date(),
  }),
};

const updateCourseById = {
  params: Joi.object().keys({
    courseId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    thumbnail: Joi.string(),
    name: Joi.string(),
    author: Joi.string(),
    description: Joi.string().allow(''),
  }),
};

const getCourseById = {
  params: Joi.object().keys({
    courseId: Joi.number().required(),
  }),
};

const deleteCourseById = {
  params: Joi.object().keys({
    courseId: Joi.number().required(),
  }),
};

const getCourses = {
  params: Joi.object().keys({
    authors: Joi.string(),
  }),
};

const getCoursesByAuthor = {
  query: Joi.object().keys({
    author: Joi.string(),
  }),
};

module.exports = {
  createCourse,
  updateCourseById,
  deleteCourseById,
  getCourses,
  getCoursesByAuthor,
  getCourseById,
};
