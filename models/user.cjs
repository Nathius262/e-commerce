'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: 'UserRoles', // Reference the join table directly
        foreignKey: 'userId',
        otherKey: 'roleId',
        as: 'roles',
      });
      User.hasMany(models.Listing, { foreignKey: 'userId' });
      User.hasMany(models.Transaction, { foreignKey: 'userId' });
      User.hasMany(models.Review, { foreignKey: 'userId' });
      User.hasOne(models.Address, { foreignKey: 'userId' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};