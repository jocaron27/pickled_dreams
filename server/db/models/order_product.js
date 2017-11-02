const Sequelize = require('sequelize')
const db = require('../db')

//product ordered by customer

const OrderProduct = db.define('order_product', {
<<<<<<< HEAD
    // orderId: {
    //     //foreign id
    // },
    // productId: {
    //     //foreign id
    // },
<<<<<<< HEAD
=======
>>>>>>> noorulain
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
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

<<<<<<< HEAD

module.exports = OrderProduct;
=======
>>>>>>> noorulain


module.exports = OrderProduct;