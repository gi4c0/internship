'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobCategories = sequelize.define('JobCategories', {
    jobCategory: DataTypes.STRING
  }, {});
  JobCategories.associate = function(models) {
    // associations can be defined here
  };
  return JobCategories;
};