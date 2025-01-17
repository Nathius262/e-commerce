'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'userId' });
      Transaction.hasMany(models.OrderItem, { foreignKey: 'transactionId', as: 'items' });

    }
  }
  Transaction.init({
    trackingId: DataTypes.STRING,
    currency: DataTypes.STRING,
    paidAt: DataTypes.DATE,
    paymentChannel: DataTypes.STRING,
    gatewayResponse: DataTypes.STRING,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    payment_status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};