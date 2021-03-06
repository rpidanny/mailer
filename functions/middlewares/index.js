const express = require('express')
const cors = require('cors')
const Boom = require('boom')
const mail = require('../mail')
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')
const { allowedOrigins } = require('../config')

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(Boom.unauthorized('No Origin.'))
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(Boom.unauthorized(`Unauthorized Origin: ${origin}`))
    }
    return callback(null, true)
  }
}

module.exports = app => {
  app.use(cors(corsOptions))

  // routes
  mail(app)

  app.use(genericErrorHandler)
  app.use(methodNotAllowed)
}