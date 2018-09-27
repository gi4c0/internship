'use strict';
module.exports = (sequelize, DataTypes) => {
  const Naics = sequelize.define('Naics', {
    naicsName: DataTypes.STRING,
    naicsId: DataTypes.STRING
  }, {});
  Naics.associate = function(models) {
    // associations can be defined here
  };
  return Naics;
};