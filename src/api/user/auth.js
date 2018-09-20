const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')

const secret = 'secret'
const saltRounds = 10

exports.registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
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
exports.loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
})

exports.register = wrapper(async (req, res, next) => {
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
})

// TODO Change "secret" on RSA key(see jsonwebtoken doc)
exports.login = wrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  if (!user) return next({ httpCode: 404, message: 'No such user found' })

  const successCompare = await bcrypt.compare(req.body.password, user.password)
  if (!successCompare) return next({ httpCode: 401, message: 'Password doesn’t match' })

  const token = await jwt.sign({ email: user.email }, secret)
  res.json({ token: token })
})
