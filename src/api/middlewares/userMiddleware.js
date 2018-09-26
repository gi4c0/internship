const jwt = require('jsonwebtoken')
const util = require('util')

const verifyJwt = util.promisify(jwt.verify)
const config = require('config')
const secret = config.get('secret')

exports.userMiddleware = async (req, res, next) => {
  req.user = await verifyJwt(req.get('Authorization'), secret).catch(next)
  next()
}
