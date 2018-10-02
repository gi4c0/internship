const jwt = require('jsonwebtoken')
const util = require('util')

const verifyJwt = util.promisify(jwt.verify)
const config = require('config')
const secret = config.get('secret')

exports.userMiddleware = (role = '') => async (req, res, next) => {
  if (!req.get('Authorization')) return next({ httpCode: 401, message: 'Jwt must be provided' })
  req.user = await verifyJwt(req.get('Authorization'), secret).catch(next)
  if (role && (req.user.role !== role)) {
    return next({ httpCode: 401, message: `This is only for ${role}` })
  }
  next()
}
