const express = require('express')
const cors = require('cors')({origin: true})
const mail = require('../mail')
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')

module.exports = app => {
  app.use(cors)

  // routes
  mail(app)

  app.use(genericErrorHandler)
  app.use(methodNotAllowed)
}