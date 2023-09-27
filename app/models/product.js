const { DataTypes } = require('sequelize');
const sequelize = require('../service')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    lotNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    },
    availableQTY: {
    type: DataTypes.INTEGER,
    },
});

module.exports = Product;
