'use strict'
const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const Naics = sequelize.define('Naics', {
    naicsName: { type: Sequelize.STRING },
    naicsId: { type: Sequelize.STRING }
  }, {})
  Naics.associate = function (models) {
    // associations can be defined here
  }
  return Naics
}
