'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    static associate(models) {
      House.hasMany(models.Listing, { foreignKey: 'category_id', constraints: false, as: 'listings' });
    }
  }

  House.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.FLOAT, // Size in square meters
      allowNull: false,
    },
    number_of_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'House',
  });

  return House;
};
