const Joi = require('joi')

exports.registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  middleName: Joi.string(),
  title: Joi.string(),
  image: Joi.string().uri({ scheme: ['http', 'https', '.jpg'] }),
  ssn: Joi.string(),
  phone: Joi.string(),
  cell: Joi.string(),
  countryCode: Joi.string(),
  city: Joi.string(),
  website: Joi.string(),
  address: Joi.string(),
  state: Joi.string(),
  role: Joi.string().valid('agent', 'recruiter').required()
})
exports.loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
})
exports.askForgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required()
})
exports.resetPasswordSchema = Joi.object().keys({
  password: Joi.string().min(8).required()
})
exports.changePasswordSchema = Joi.object().keys({
  token: Joi.string().required(),
  password: Joi.string().min(8).required(),
  passwordNew: Joi.string().min(8).required()
})
exports.changeUserSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  middleName: Joi.string(),
  title: Joi.string(),
  image: Joi.string(),
  ssn: Joi.string(),
  phone: Joi.string(),
  cell: Joi.string(),
  countryCode: Joi.string(),
  city: Joi.string(),
  website: Joi.string(),
  address: Joi.string(),
  state: Joi.string()
})
