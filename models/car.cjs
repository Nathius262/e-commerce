'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.hasMany(models.Listing, { foreignKey: 'category_id', constraints: false, as: 'listings' });
    }
  }

  Car.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mileage: {
      type: DataTypes.FLOAT, // Mileage in km or miles
      allowNull: false,
    },
    engine_type: {
      type: DataTypes.STRING, // E.g., Petrol, Diesel, Electric
      allowNull: false,
    },
    model_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'Car',
  });

  return Car;
};
