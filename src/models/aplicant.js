const Sequelize = require('sequelize')

exports.jobFactory = sequelize => sequelize.define('Job', {
  agentId: { type: Sequelize.INTEGER, allowNull: false },
  jobId: { type: Sequelize.INTEGER, allowNull: false },
  experience: { type: Sequelize.INTEGER, allowNull: false },
  firstName: { type: Sequelize.STRING, allowNull: false },
  resume: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.STRING },
  status: { type: Sequelize.STRING },
  middleName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  ssn: { type: Sequelize.STRING },
  cell: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  address1: { type: Sequelize.STRING },
  address2: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  country: { type: Sequelize.STRING },
  postalCode: { type: Sequelize.STRING },
  countryCode: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  website: { type: Sequelize.STRING },
  additionalInformation: { type: Sequelize.STRING },
  linkedin: { type: Sequelize.STRING },
  bullhornScore: { type: Sequelize.INTEGER },
  hireScore: { type: Sequelize.INTEGER }
}, {
  freezeTableName: true
})
