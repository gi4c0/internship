const { JobCategories } = require('../../models/index.js')
const { Naics } = require('../../models/index.js')
const { Job } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')

exports.getCategories = wrapper(async (req, res, next) => {
  const result = await JobCategories.all()
  res.json({ jobCategories: result })
})
exports.getNaics = wrapper(async (req, res, next) => {
  const result = await Naics.all()
  res.json({ naics: result })
})
exports.addJob = wrapper(async (req, res, next) => {
  await Job.create({ ...req.body, recruiterId: req.user.id })
  res.sendStatus(201)
})
exports.getJob = wrapper(async (req, res, next) => {
  let query = {}
  if (req.user.role === 'recruiter') {
    query = { where: { recruiterId: req.user.id } }
  }
  const result = await Job.findAll(query)
  return res.json({ job: result })
})
exports.getJobById = wrapper(async (req, res, next) => {
  let query = { where: { id: req.params.jobid } }
  if (req.user.role === 'recruiter') {
    query.where.recruiterId = req.user.id
  }
  const result = await Job.findOne(query)
  res.json({ job: result })
})
exports.updateJob = wrapper(async (req, res, next) => {
  let query = { where: { id: req.params.jobid, recruiterId: req.user.id } }
  await Job.update(req.body, query)
  res.sendStatus(200)
})
