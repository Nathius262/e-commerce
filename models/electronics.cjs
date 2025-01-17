'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Electronics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Electronics.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  Electronics.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    condition: DataTypes.STRING,
    warranty: DataTypes.STRING,
    listingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Electronics',
  });
  return Electronics;
};