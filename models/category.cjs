'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Listing, { foreignKey: 'categoryId', as: 'listings' });
    }
  }

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // E.g., 'Electronics', 'Car', 'House'
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};
