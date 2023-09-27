const User = require('./user');
const UserType = require('./user.type');
const Product = require("./product")
const Order = require("./order")
const sequelize = require('../service/');

module.exports = {
  User,
  UserType,
  Product,
  Order,
};
