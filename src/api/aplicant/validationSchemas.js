const Joi = require('joi')

exports.addJobSchema = Joi.object().keys({
  body: {
    agentId: Joi.number().required(),
    jobId: Joi.number().required(),
    experience: Joi.number().required(),
    firstName: Joi.string().required(),
    resume: Joi.string().required().uri({ scheme: ['http', 'https', '.doc', 'docx', 'pdf'] }),

    image: Joi.string().uri({ scheme: ['http', 'https', '.jpg'] }),
    status: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    ssn: Joi.string(),
    cell: Joi.string(),
    email: Joi.string(),
    address1: Joi.string(),
    address2: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    postalCode: Joi.string(),
    countryCode: Joi.string(),
    phone: Joi.string(),
    website: Joi.string(),
    additionalInformation: Joi.string(),
    linkedin: Joi.string(),
    bullhornScore: Joi.number(),
    hireScore: Joi.number()
  }
}).unknown()
