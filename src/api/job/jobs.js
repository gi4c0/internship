const { JobCategories } = require('../../models/index.js')
const { Naics } = require('../../models/index.js')
const { Job } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')

exports.getCategories = wrapper(async (req, res, next) => {
  const result = await JobCategories.all()
  res.json(result)
})
exports.getNaics = wrapper(async (req, res, next) => {
  const result = await Naics.all()
  res.json(result)
})
exports.addJob = wrapper(async (req, res, next) => {
  await Job.create({ ...req.body, recruiterId: req.user.id })
  res.sendStatus(200)
})
exports.getJob = wrapper(async (req, res, next) => {
  let query = {}
  if (['admin', 'agent'].includes(req.user.role)) {
  } else { query = { where: { recruiterId: req.user.id } } }
  const result = await Job.findAll(query)
  return res.json(result)
})
exports.changeJob = wrapper(async (req, res, next) => {
  let query = {}
  if (!req.query.id) return next({ httpCode: 400, message: 'id is required' })
  if (['admin', 'agent'].includes(req.user.role)) {
    query = { where: { id: req.query.id, recruiterId: req.user.id } }
  } else {
    query = { where: { id: req.query.id } }
  }
  await Job.update(req.body, query)
  res.sendStatus(200)
})
