const Sequelize = require('sequelize')
const db = require('../db')

//product ordered by customer

const ProductCategory = db.define('product_categories', {})

module.exports = ProductCategory
