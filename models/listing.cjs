'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Listing.belongsTo(models.User, { foreignKey: 'userId' });
      Listing.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Listing.hasMany(models.Review, { foreignKey: 'listingId' });
      Listing.hasMany(models.OrderItem, { foreignKey: 'listingId' });

      //extended categories
      Listing.hasOne(models.Electronics, { foreignKey: 'listingId', as: 'electronics' });
      Listing.hasOne(models.House, { foreignKey: 'listingId', as: 'house' });
      Listing.hasOne(models.Car, { foreignKey: 'listingId', as: 'car' });
    }
  }
  Listing.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    images: DataTypes.STRING,
    location: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};