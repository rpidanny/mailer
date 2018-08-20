const express = require('express')
const cors = require('cors')
const Boom = require('boom')
const mail = require('../mail')
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')

const whitelist = ['https://abhishek.pro.np']

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(Boom.unauthorized('Unauthorized origin'))
    
    if (whitelist.indexOf(origin) === -1) {
      return callback(Boom.unauthorized('Unauthorized origin'))
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