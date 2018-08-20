const functions = require('firebase-functions');
const httpStatus = require('http-status-codes')
const mailer = require('./mailer')
const util = require('./util')

const mailTransport = mailer.getMailer()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.hello = functions.https.onRequest((request, response) => {
  if (request.method !== 'GET') {
    return response
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .send({
        code: httpStatus.METHOD_NOT_ALLOWED,
        message: httpStatus.getStatusText(httpStatus.METHOD_NOT_ALLOWED)
      })
  } 
  return response.json({
    data: {
      message: 'Hello World'
    }
  })
});

exports.mail = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    return response
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .send({
        code: httpStatus.METHOD_NOT_ALLOWED,
        message: httpStatus.getStatusText(httpStatus.METHOD_NOT_ALLOWED)
      })
  }
  const result = util.validateEmail(request.body)
  if (result.error) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .send({
        code: httpStatus.BAD_REQUEST,
        message: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
        details:
          result.error.details &&
          result.error.details.map(err => {
            return {
              message: err.message,
              param: err.path.join('.')
            }
          })
      })
  }
  const { to, subject, text } = request.body
  const mailOptions = mailer.template(to, subject, text)
  mailTransport
    .sendMail(mailOptions)
    .then(data =>
      response.send({
        data: {
          success: true,
          message: 'Email Sent'
        }
      })
    )
    .catch(err => res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
        details: err.message
      })
    )
});