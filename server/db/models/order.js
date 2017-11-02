const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    date: {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM('cart', 'pending', 'shipped', 'delivered'),
        defaultValue: 'cart'
    },
    total: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0
    }
})




module.exports = Order;

