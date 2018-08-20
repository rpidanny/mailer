const httpStatus = require('http-status-codes')
const newError = require('../util/errors')

exports.notFound = (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    error: {
      code: httpStatus.NOT_FOUND,
      message: httpStatus.getStatusText(httpStatus.NOT_FOUND)
    }
  })
}

exports.methodNotAllowed = (req, res) => {
  res.status(httpStatus.METHOD_NOT_ALLOWED).send({
    error: httpStatus.METHOD_NOT_ALLOWED,
    message: httpStatus.getStatusText(httpStatus.METHOD_NOT_ALLOWED)
  })
}

exports.genericErrorHandler = (err, req, res, next) => {
  logger.error(err)

  let error = newError(err)
  res.status(error.code).send({ error })
}