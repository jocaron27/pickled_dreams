const Category = require('./category');
const OrderProduct = require('./order_product');
const Order = require('./order.js');
const Product = require('./product');
const Review = require('./review');
const User = require('./user');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Review);
User.hasMany(Order);
Order.belongsToMany(User, {through: 'user_orders'});
Product.hasMany(Review);
Product.belongsToMany(Category, {through: 'product_categories'});
Category.belongsToMany(Product, {through: 'product_categories'})
OrderProduct.belongsTo(Order)
OrderProduct.belongsTo(Product, {as: 'product'})

module.exports = {
  Category, OrderProduct, Order, Product, Review, User
}
