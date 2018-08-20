const functions = require('firebase-functions');
const httpStatus = require('http-status-codes')
const express = require('express')
const middlewares = require('./middlewares')

const app = express()

middlewares(app)

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

exports.mail = functions.https.onRequest(app)