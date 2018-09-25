
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')

const verifyJwt = util.promisify(jwt.verify)
const { User } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')
const { sendMail } = require('../../utils/mail')

const secret = 'secret'
const saltRounds = 10
const config = require('config')
const url = config.get('url')

exports.register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    await User.create({ ...req.body, password: hashedPassword })

    const token = await jwt.sign({ email: req.body.email }, 'registration')
    const mailBody = {
      token: token,
      email: req.body.email,
      route: url + '/api/users/confirm-token',
      subject: 'Email confirmation'
    }
    sendMail(mailBody)
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
  const result = await verifyJwt(req.query.token, 'registration')
  const user = await User.findOne({ where: { email: result.email } })
  if (user.isVerified) { return next({ httpCode: 401, message: 'Already confirmed' }) }

  await user.update({ isVerified: true })
  res.json('Success confirmed')
})

// TODO need to destroy previous JWT Token ------------------
exports.changePassword = wrapper(async (req, res, next) => {
  const result = await verifyJwt(req.body.token, secret)
  const user = await User.findOne({ where: { email: result.email } })
  if (!user) return next({ httpCode: 404, message: 'No such user found' })

  const successCompare = await bcrypt.compare(req.body.password, user.password)
  if (!successCompare) return next({ httpCode: 401, message: 'Password doesn’t match' })

  const hashedPassword = await bcrypt.hash(req.body.password_new, saltRounds)
  await user.update({ password: hashedPassword })
  res.json('Successfully changed!')
})

// TODO need to destroy previous JWT Token №2 ------------------
exports.resetPassword = wrapper(async (req, res, next) => {
  const result = await verifyJwt(req.query.token, 'forgot_password')
  const user = await User.findOne({ where: { email: result.email } })

  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
  await user.update({ password: hashedPassword })
  res.json('Success reset!')
})

exports.askForgotPassword = wrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  if (!user) return next({ httpCode: 404, message: 'No such user found' })
  const token = await jwt.sign({ email: req.body.email }, 'forgot_password', { expiresIn: '5m' })

  const mailBody = {
    token: token,
    email: req.body.email,
    route: url + '/api/users/reset-password',
    subject: 'Forgot Password'
  }
  sendMail(mailBody)
  res.json('Check your email')
})
