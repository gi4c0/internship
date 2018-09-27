const Sequelize = require('sequelize')

exports.jobFactory = sequelize => sequelize.define('Job', {
  title: { type: Sequelize.STRING },
  naicsId: { type: Sequelize.STRING, allowNull: false },
  shift: { type: Sequelize.STRING, allowNull: false },
  experience: { type: Sequelize.FLOAT, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
  salary: { type: Sequelize.STRING, allowNull: false },
  timeToFill: { type: Sequelize.INTEGER, allowNull: false },
  recruiterId: { type: Sequelize.STRING, allowNull: false },
  smartContractID: { type: Sequelize.STRING, allowNull: false },
  isHired: { type: Sequelize.BOOLEAN, allowNull: false },

  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  country: { type: Sequelize.STRING },
  postalCode: { type: Sequelize.STRING },

  location: { type: Sequelize.STRING },
  jobCategoryId: { type: Sequelize.STRING },
  hireBudget: { type: Sequelize.STRING },
  bountyAmount: { type: Sequelize.INTEGER }
}, {
  freezeTableName: true
})
