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
  // const mailOptions = mailer.template('abhishekmaharjan1993@gmail.com', 'Serverless Test', 'Serverless mailer is working!!!')
  // mailTransport.sendMail(mailOptions)
  return response.send({
    body: request.body,
    validation: result
  })
});