const passport = require('passport');
const httpStatus = require('http-status');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  const tokenString = req.headers.authorization?.split('Bearer')?.[1]?.trim();
  const token = await Token.findOne({ token: tokenString, blacklisted: false, type: tokenTypes.ACCESS });

  if (err || info || !user || !token) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  // let origin = req.headers.origin;
  // origin = origin.split('http://')[0].split('/')[0];
  // const apps = await Apps.find({ _id: { $in: [...Object.keys(user.limits)] } });
  // const appLinks = apps.map((r) => r.link);
  // if (!appLinks.includes(origin)) {
  //   return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  // }
  if (user.archive === true) {
    return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  }
  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
