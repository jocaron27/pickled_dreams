const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
    // orderId: {
    //     //foreign id
    // },
    // productId: {
    //     //foreign id
    // },
<<<<<<< HEAD
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.FLOAT,
        default: null
    }
=======
    // quantity: {
    //     type: Sequelize.INTEGER
    // },
    // price: {
    //     type: Sequelize.FLOAT,
    //     default: null
    // }
>>>>>>> Tony
})


module.exports = OrderProduct;

