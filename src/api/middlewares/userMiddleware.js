const jwt = require('jsonwebtoken')
const util = require('util')

const verifyJwt = util.promisify(jwt.verify)
const config = require('config')
const secret = config.get('secret')

exports.userMiddleware = async (req, res, next) => {
  if (!req.get('Authorization')) return next({ httpCode: 401, message: 'Jwt must be provided' })
  req.user = await verifyJwt(req.get('Authorization'), secret).catch(next)
  next()
}
