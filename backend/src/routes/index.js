const express = require('express');
const miscRoute = require('./misc.route');
const courseRoute = require('./course.route');
const coursesRoute = require('./courses.route');
const { courseController } = require('../controllers');

const router = express.Router();
const routes = [
  {
    path: '/misc',
    route: miscRoute,
  },
  {
    path: '/course',
    route: courseRoute,
  },
  {
    path: '/courses',
    route: coursesRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
