const connection = require('../connection');
const { courseDateKeys, courseKeys } = require('../utils/converter');
const util = require('util');
const {
  constructInsertQuery,
  constructUpdateQuery,
} = require('../utils/sql-queries');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const queryAsync = util.promisify(connection.query).bind(connection);

const createCourse = async (body) => {
  const query = constructInsertQuery(
    body,
    courseKeys,
    'course',
    courseDateKeys
  );
  await queryAsync(query);
};

const getAllCoursesByFltr = async (req) => {
  const filter = pick(req.query, ['author']);
  let filterCond = '';
  if (filter?.author) {
    filterCond = ' WHERE author IN (';
    const authorLst = filter.author.split(',') || [];
    authorLst.forEach((author, index) => {
      author = `'${author}'`;
      if (index === authorLst.length - 1) {
        filterCond += `${author})`;
        return;
      }
      filterCond += `${author}, `;
    });
  }
  const query = 'SELECT * from course' + filterCond + ';';
  const data = await queryAsync(query);
  return data;
};

const updateCourseById = async (courseId, body) => {
  const query = constructUpdateQuery('course', body, { id: courseId });
  const data = await queryAsync(query);
  if (!data?.affectedRows) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course not found');
  }
  return data;
};

const deleteCourseById = async (courseId) => {
  const query = `DELETE FROM course WHERE id = ${courseId}`;
  const data = await queryAsync(query);
  if (!data?.affectedRows) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course not found');
  }
};

module.exports = {
  createCourse,
  getAllCoursesByFltr,
  updateCourseById,
  deleteCourseById,
};
