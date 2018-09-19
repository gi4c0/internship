const Joi = require('joi')
const bcrypt = require('bcrypt')
const { User } = require('../../models/index.js')
const jwt = require('jsonwebtoken')
const secret = 'secret'
const saltRounds = 10
// const { wrapper } = require('../../utils/wrapper.js')

exports.register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    await User.create({ ...req.body, password: hashedPassword })
    res.sendStatus(201)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw { httpCode: 400, message: 'This email is already taken' }
    }
    next(err)
  }
}

// TODO Change "secret" on RSA key(see jsonwebtoken doc)
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    const successCompare = await bcrypt.compare(req.body.password, user.password)
    const token = await jwt.sign({ email: user.email }, secret)
    if (successCompare) {
      return res.json({ token: token })
    }
    return next({ httpCode: 401, message: "Password don't match" })
  } catch (err) {
    return next({ httpCode: 500, message: err })
  }
}

exports.registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
})
