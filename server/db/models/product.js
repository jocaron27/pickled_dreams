const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      quantityAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      photo: {
        type: Sequelize.TEXT,
        default: ''
      }
})
///Products will have to belongtoMany Categories and vice-versa

module.exports = Product;

