const Joi = require('joi')

const { User } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')

exports.register = [
  wrapper(async (req, res, next) => {
    try {
      await User.create(req.body)
      res.sendStatus(201)
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw { httpCode: 400, message: 'This email is already taken' }
      }

      next(err)
    }
  })
]

exports.registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
})
