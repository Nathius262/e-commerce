'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // General associations
      Listing.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' }); // The listing owner
      Listing.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' }); // Category of the listing
      Listing.hasMany(models.Review, { foreignKey: 'listingId', as: 'reviews' }); // User reviews for the listing
      Listing.hasMany(models.OrderItem, { foreignKey: 'listingId', as: 'orderItems' }); // Orders associated with this listing

      // Polymorphic associations for category-specific details
      Listing.belongsTo(models.Electronics, { foreignKey: 'category_id', constraints: false, as: 'electronics' });
      Listing.belongsTo(models.House, { foreignKey: 'category_id', constraints: false, as: 'house' });
      Listing.belongsTo(models.Car, { foreignKey: 'category_id', constraints: false, as: 'car' });
    }
  }

  Listing.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active', // Possible values: active, sold, inactive
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true, // This could store comma-separated URLs for images
      get() {
        const rawValue = this.getDataValue('images');
        return rawValue ? rawValue.split(',') : [];
      },
      set(value) {
        this.setDataValue('images', value.join(','));
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER, // Polymorphic ID for category-specific details
      allowNull: false,
    },
    category_type: {
      type: DataTypes.STRING, // Polymorphic type (e.g., 'Electronics', 'House', 'Car')
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Listing',
    //tableName: 'listings', // Ensures table name consistency
  });

  return Listing;
};
