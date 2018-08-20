const express = require('express')
const cors = require('cors')({origin: true})
const routes = require('../mail')
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')

module.exports = app => {
  app.use(cors)

  routes(app)

  app.use(genericErrorHandler)
  app.use(methodNotAllowed)
}