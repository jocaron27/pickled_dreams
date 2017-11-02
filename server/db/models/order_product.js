const Sequelize = require('sequelize')
const db = require('../db')

//product ordered by customer

const OrderProduct = db.define('order_product', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        default: null
    }
})



module.exports = OrderProduct;