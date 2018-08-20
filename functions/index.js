const functions = require('firebase-functions');
const httpStatus = require('http-status-codes')
const express = require('express')
const cors = require('cors')({origin: true})
const mailer = require('./mailer')
const util = require('./util')

const app = express()
const mailTransport = mailer.getMailer()

app.use(cors)

// routes
app.get('/', (req, res) => {
  return res.json({
    data: {
      message: 'Hello World'
    }
  })
})

app.get('/test', (req, res) => {
  return res.json({
    data: {
      keys: Object.keys(req),
      headers: req.headers
    }
  })
})

app.post('/mail', (req, res) => {
  const result = util.validateEmail(req.body)
  if (result.error) {
    return res
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
  const { to, subject, text, from } = req.body
  const mailOptions = mailer.template(from, to, subject, text)
  mailTransport
    .sendMail(mailOptions)
    .then(data =>
      res.send({
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
})

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

exports.api = functions.https.onRequest(app)