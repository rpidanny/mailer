const httpStatus = require('http-status-codes')

function newError (err) {
  // validation error
  if (err.isJoi) {
    return {
      code: httpStatus.BAD_REQUEST,
      message: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map(err => {
          return {
            message: err.message,
            param: err.path.join('.')
          }
        })
    }
  }

  // HTTP error
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error
    }
  }

  // INTERNAL_SERVER_ERROR for all other cases
  return {
    code: httpStatus.INTERNAL_SERVER_ERROR,
    message: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
    details:
      err.message &&
      {
        message: err.message
      }
  }
}

module.exports = newError