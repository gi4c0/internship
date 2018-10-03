const Joi = require('joi')

exports.registerSchema = Joi.object().keys({
  body: {
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
  }
}).unknown()
exports.loginSchema = Joi.object().keys({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  }
}).unknown()
exports.askForgotPasswordSchema = Joi.object().keys({
  body: {
    email: Joi.string().email().required()
  }
}).unknown()
exports.resetPasswordSchema = Joi.object().keys({
  body: {
    password: Joi.string().min(8).required()
  }
}).unknown()
exports.changePasswordSchema = Joi.object().keys({
  body: {
    token: Joi.string().required(),
    password: Joi.string().min(8).required(),
    passwordNew: Joi.string().min(8).required()
  }
}).unknown()
exports.changeUserSchema = Joi.object().keys({
  body: {
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
  }
}).unknown()
exports.imageSchema = Joi.object().keys({
  body: {
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }).regex(/\.(jpg|png|jpeg)$/).required()
  }
}).unknown()
