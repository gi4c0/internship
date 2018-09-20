const Joi = require('joi')
const bcrypt = require('bcrypt')
const { User } = require('../../models/index.js')
const jwt = require('jsonwebtoken')
const secret = 'secret'
const saltRounds = 10
const { wrapper } = require('../../utils/wrapper.js')

exports.registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
})

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
exports.login = wrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  if (!user) return next({ httpCode: 404, message: 'No such user found' })

  const successCompare = await bcrypt.compare(req.body.password, user.password)
  if (!successCompare) return next({ httpCode: 401, message: 'Password doesn’t match' })

  const token = await jwt.sign({ email: user.email }, secret)
  res.json({ token: token })
})
