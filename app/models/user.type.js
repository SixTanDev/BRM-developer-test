const { DataTypes } = require('sequelize');
const sequelize = require('../service')

const UserType = sequelize.define('UserType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  nameUserType: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
    updatedAt: false,
});

module.exports = UserType;
