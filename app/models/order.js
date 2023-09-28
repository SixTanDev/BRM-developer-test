const { DataTypes } = require('sequelize');
const sequelize = require('../service')


const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    quantityProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    lotNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    updatedAt: false,
});

module.exports = Order;
