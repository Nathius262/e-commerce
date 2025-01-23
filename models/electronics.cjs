'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Electronics extends Model {
    static associate(models) {
      Electronics.hasMany(models.Listing, { foreignKey: 'category_id', constraints: false, as: 'listings' });
    }
  }

  Electronics.init({
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
    warranty_period: {
      type: DataTypes.INTEGER, // Warranty in months
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Electronics',
  });

  return Electronics;
};
