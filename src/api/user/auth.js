const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')

const jwtPromiseVer = util.promisify(jwt.verify)
const { User } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')
const { sendMail } = require('../../utils/mail')
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

exports.register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    await User.create({ ...req.body, password: hashedPassword })

    const token = await jwt.sign({ email: req.body.email }, 'registration')
    sendMail(token, req.body.email)
    res.sendStatus(201)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return next({ httpCode: 400, message: 'This email is already taken' })
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

  const token = await jwt.sign({ email: user.email }, secret, { expiresIn: '1d' })

  if (!user.isVerified) return next({ httpCode: 401, message: 'Please confirm your email' })
  res.json({ token: token })
})

exports.confirm = wrapper(async (req, res, next) => {
  const result = await jwtPromiseVer(req.query.token, 'registration')
  const user = await User.findOne({ where: { email: result.email } })
  if (user.isVerified) { return next({ httpCode: 401, message: 'Already confirmed' }) }

  await user.update({ isVerified: true })
  res.json('Success confirmed')
})
