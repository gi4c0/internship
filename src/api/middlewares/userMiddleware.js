const jwt = require('jsonwebtoken')
const util = require('util')

const verifyJwt = util.promisify(jwt.verify)
const config = require('config')
const secret = config.get('secret')

exports.userMiddleware = async (req, res, next) => {
  req.result = await verifyJwt(req.body.token, secret).catch((err) => next(err))
  next()
}
exports.userMiddlewareFile = async (req, res, next) => {
  req.result = await verifyJwt(req.query.token, secret).catch((err) => next(err))
  next()
}
