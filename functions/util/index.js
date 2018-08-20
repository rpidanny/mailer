const Joi = require('joi')

const emailSchema = Joi.object().keys({
  from: Joi.string(),
  to: Joi.string().email({minDomainAtoms: 2}).required(),
  subject: Joi.string().required(),
  text: Joi.string().required()
})

exports.validateEmail = obj =>
  Joi.validate(obj, emailSchema)