const jwt = require('jsonwebtoken')
const util = require('util')

const verifyJwt = util.promisify(jwt.verify)
const config = require('config')
const secret = config.get('secret')

exports.userMiddleware = async (req, res, next) => {
  req.user = await verifyJwt(req.body.token, secret).catch(next)
  next()
}
exports.userMiddlewareFile = async (req, res, next) => {
  req.user = await verifyJwt(req.query.token, secret).catch(next)
  next()
}
