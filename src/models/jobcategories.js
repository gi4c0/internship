'use strict'
const Sequelize = require('sequelize')
module.exports = (sequelize) => {
  const JobCategories = sequelize.define('JobCategories', {
    jobCategory: { type: Sequelize.STRING, primaryKey: false }
  }, { timestamps: false })
  JobCategories.associate = function (models) {
    // associations can be defined here
  }
  return JobCategories
}
