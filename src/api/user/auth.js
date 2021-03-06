const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')
// const _ = require('lodash')
const fs = require('fs')

const config = require('config')
const secret = config.get('secret')
const url = config.get('url')
const secretForgotPass = config.get('secretForgotPass')
const secretRegistration = config.get('secretRegistration')
const saltRounds = 10

const verifyJwt = util.promisify(jwt.verify)
const deleteFile = util.promisify(fs.unlink)
const { User } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')
const { sendMail } = require('../../utils/mail')

exports.register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    await User.create({ ...req.body, password: hashedPassword })

    const token = await jwt.sign({ email: req.body.email }, secretRegistration)
    const mailBody = {
      token,
      email: req.body.email,
      route: '/api/users/confirm-token',
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

  if (!user.isVerified) return next({ httpCode: 401, message: 'Please confirm your email' })
  const token = await jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1d' })
  res.json({ token })
})
exports.confirm = wrapper(async (req, res, next) => {
  const result = await verifyJwt(req.query.token, secretRegistration).catch((err) => next({ httpCode: 400, message: err.message }))

  const user = await User.findOne({ where: { email: result.email } })
  if (user.isVerified) return next({ httpCode: 401, message: 'Already confirmed' })

  await user.update({ isVerified: true })
  res.sendStatus(200)
})

// TODO need to destroy previous JWT Token ------------------
exports.changePassword = wrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.user.email } })

  if (!user) return next({ httpCode: 404, message: 'No such user found' })

  const successCompare = await bcrypt.compare(req.body.password, user.password)
  if (!successCompare) return next({ httpCode: 401, message: 'Password doesn’t match' })

  const hashedPassword = await bcrypt.hash(req.body.passwordNew, saltRounds)
  await user.update({ password: hashedPassword })
  res.sendStatus(200)
})
// TODO need to destroy previous JWT Token №2 ------------------
exports.resetPassword = wrapper(async (req, res, next) => {
  const result = await verifyJwt(req.query.token, secretForgotPass)
  const user = await User.findOne({ where: { email: result.email } })

  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
  await user.update({ password: hashedPassword })
  res.sendStatus(200)
})
exports.askForgotPassword = wrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  if (!user) return next({ httpCode: 404, message: 'No such user found' })
  const token = await jwt.sign({ email: req.body.email }, secretForgotPass, { expiresIn: '5m' })

  const mailBody = {
    token,
    email: req.body.email,
    route: '/api/users/reset-password',
    subject: 'Forgot Password'
  }
  sendMail(mailBody)
  res.json('Check your email')
})
exports.getCurrentUser = wrapper(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.user.email }, attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'isVerified', 'password'] } })
  res.json(user.dataValues)
})
exports.updateProfile = wrapper(async (req, res, next) => {
  await User.update(req.body, { where: { email: req.user.email } })
  res.sendStatus(200)
})
exports.imgUpload = wrapper(async (req, res, next, err) => {
  if (req.body.avatar) {
    res.sendStatus(200)
    return User.update({ image: req.body.avatar }, { where: { email: req.user.email } })
  }
  const user = await User.findOne({ where: { email: req.user.email } })
  if (user.image) deleteFile('public' + user.image.replace(url, '')).catch(next)
  await User.update({ image: url + req.file.path.replace(/public/g, '') }, { where: { email: req.user.email } })
  res.sendStatus(200)
})
