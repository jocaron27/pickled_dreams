const Sequelize = require('sequelize')
const db = require('../db')
const { Product, OrderProduct } = db.models

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
Order.prototype.hook = function () {
    let quantity = 0;
    afterUpdate({
        where: {
            status: {
                $neq: 'cart'
            }
        }
    })
    // , OrderProduct.findById(this.id))
    //     .then(function (orderProduct) {
    // Product.findById(orderProduct.productId
    //     })
    // .then(foundProduct => foundProduct.update({ quantity_available: quantity_available }))
}
Order.prototype.delivered = function () { //changes status to delivered
    this.status = 'delivered';
    this.date = new Date();
    return this.save();
}

Order.prototype.getTotal = function () {//Updates total price of order
    let totalPrice = 0;
    return OrderProduct.findAll({
        where: { orderId: this.id }
    })
        .then(orderItems => {
            orderItems.forEach(item => { totalPrice += (item.price * item.quantity) })
        })
        .then(function () {
            this.update({ total: totalPrice })
        })
}




module.exports = Order;

