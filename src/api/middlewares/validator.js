const Joi = require('joi')

exports.validate = schema => (req, res, next) => {
  const result = Joi.validate(req.body, schema)
  if (result.error) {
    const messages = result.error.details.map(d => d.message).join('. ')
    throw { httpCode: 400, message: messages }
  }

  next()
}
