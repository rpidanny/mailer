const express = require('express')
const cors = require('cors')({origin: true})
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')

module.exports = app => {
  app.use(cors)

  app.use(genericErrorHandler)
  app.use(methodNotAllowed)
}