const Sequelize = require('sequelize')

exports.userFactory = sequelize => sequelize.define('User', {
  email: {type: Sequelize.STRING, unique: true, allowNull: false},
  password: {type: Sequelize.STRING, allowNull: false},
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
}, {
  freezeTableName: true
})
