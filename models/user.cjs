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
      User.hasMany(models.Listing, { foreignKey: 'userId', as:'listings' });
      User.hasMany(models.Transaction, { foreignKey: 'userId', as:'transactions' });
      User.hasMany(models.Review, { foreignKey: 'userId', as:'reviews' });
      User.hasOne(models.Address, { foreignKey: 'userId', as:'address' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};