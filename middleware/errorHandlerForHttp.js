const { constants } = require('../constants');

const errorHandlerForHttp = (err, req, res, next) => {
  console.log('res', res.statusCode);
  const statusCode = res.statusCode || constants.SERVER_ERROR;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(constants.VALIDATION_ERROR).json({
        title: 'Validation Failed',
        message: err.message,
        // Consider removing or sanitizing stackTrace in production
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(constants.NOT_FOUND).json({
        title: 'Not Found',
        message: err.message,
        // Consider removing or sanitizing stackTrace in production
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(constants.UNAUTHORIZED).json({
        title: 'Unauthorized',
        message: err.message,
        // Consider removing or sanitizing stackTrace in production
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(constants.FORBIDDEN).json({
        title: 'Forbidden',
        message: err.message,
        // Consider removing or sanitizing stackTrace in production
        stackTrace: err.stack,
      });
      break;
    default:
      res.status(constants.SERVER_ERR0R).json({
        title: 'Internal Server Error',
        message: err.message,
        // Consider removing or sanitizing stackTrace in production
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandlerForHttp;