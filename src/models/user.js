const Sequelize = require('sequelize')

exports.userFactory = sequelize => sequelize.define('User', {
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  middleName: { type: Sequelize.STRING },
  role: { type: Sequelize.STRING },
  title: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  ssn: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  cell: { type: Sequelize.STRING },
  countryCode: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  website: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING }
}, {
  freezeTableName: true
})
