const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const connection = require('./connection');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloud_api_key,
  api_secret: config.cloudinary.cloud_api_secret
});

let server;

server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (connection) {
    connection.end();
  }
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (connection) {
    connection.end();
  }
  if (server) {
    server.close();
  }
});
