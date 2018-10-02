const Joi = require('joi')

exports.addJobSchema = Joi.object().keys({
  title: Joi.string().required(),
  naicsId: Joi.number().required(),
  shift: Joi.string().required(),
  experience: Joi.number().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  salary: Joi.string().required(),
  timeToFill: Joi.number().required(),
  smartContractID: Joi.string(),
  isHired: Joi.boolean().required(),

  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  postalCode: Joi.string(),
  location: Joi.string(),
  jobCategoryId: Joi.number(),
  hireBudget: Joi.string(),
  bountyAmount: Joi.number()
})
exports.changeJobSchema = Joi.object().keys({
  title: Joi.string(),
  naicsId: Joi.number(),
  shift: Joi.string(),
  experience: Joi.number(),
  description: Joi.string(),
  status: Joi.string(),
  salary: Joi.string(),
  timeToFill: Joi.number(),
  smartContractID: Joi.string(),
  isHired: Joi.boolean(),

  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  postalCode: Joi.string(),
  location: Joi.string(),
  jobCategoryId: Joi.string(),
  hireBudget: Joi.string(),
  bountyAmount: Joi.string()
})
