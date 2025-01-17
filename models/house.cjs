'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  House.init({
    property_type: DataTypes.STRING,
    size: DataTypes.FLOAT,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};