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



 // NEED BOTH belongsToMany when dealing with through tables
User.hasMany(Review);//1:M
Review.belongsToMany(User, {through: 'user_reviews'})
User.belongsToMany(Review,{through: 'user_reviews'});//N:M
User.hasMany(Order);//1:M
Product.hasMany(Review);//1:M unsure if we need a Review.belongsToMany(Product) when all we will need to do to get single product reviews is product.getReviews
Product.belongsToMany(Category, {through: 'product_categories'});
Category.belongsToMany(Product, {through: 'product_categories'});//N:M
Order.hasMany(Product);//1:M
Product.belongsToMany(Order, {through: 'order_product'});
Order.belongsToMany(Product, {through: 'order_product'});//N:M
///PRODUCT TABLE still has orderId might be Order.hasMany(product);

///FILL IN PRICE OF ORDER_PRODUCTS TABLE AFTER order is not 'cart'

//SET DATE WHEN ORDER.status in ORDER TABLE is not 'cart'
///SET TOTAL AFTER ORDER IS CONFIRMED AS WELL in ORDER TABLE

//LOOK INTO SESSIONS TABLE, MAYBE PUT CART OF NON-LOGIN USER on DATA possibly

module.exports = {
  Category, OrderProduct, Order, Product, Review, User
}
