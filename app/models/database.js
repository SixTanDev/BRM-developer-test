const User = require('./user');
const UserType = require('./user.type');
const Product = require('./product');
const Order = require('./order')
const sequelize = require('../service/');

// Relationship: One - Many: UserType - User
User.belongsTo(UserType, { foreignKey: 'user_type_id' });
UserType.hasMany(User, { foreignKey: 'user_type_id' });

// Relationship: One - Many: User - Product
Product.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Product, { foreignKey: 'user_id' });


// Relationship: One - Many: User - Order
User.hasMany(Order, { foreignKey: 'seller_id', as: 'sellerOrders' });
User.hasMany(Order, { foreignKey: 'buyer_id', as: 'buyerOrders' });
Order.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });
Order.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });


sequelize.sync({ force: false })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
});
