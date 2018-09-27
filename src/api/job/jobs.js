const { Job } = require('../../models/index.js')
const { JobCategories } = require('../../models/index.js')
const { Naics } = require('../../models/index.js')
const { wrapper } = require('../../utils/wrapper.js')

exports.getCategories = wrapper(async (req, res, next) => {
  const result = await JobCategories.all()
  res.json(result)
})
exports.getNaics = wrapper(async (req, res, next) => {
  const result = await Naics.all()
  res.json(result)
})
