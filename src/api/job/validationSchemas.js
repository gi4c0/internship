const Joi = require('joi')

exports.addJobSchema = Joi.object().keys({
  body: {
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
  }
}).unknown()
exports.changeJobSchema = Joi.object().keys({
  body: {
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
  }
}).unknown()
exports.getJobSchema = Joi.object().keys({
  query: {
    limit: Joi.number().min(1).max(50),
    offset: Joi.number(),
    title: Joi.any()
  }
}).unknown()
