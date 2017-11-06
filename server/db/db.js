const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/pickled_dreams', {
    logging: false,
    dialect: 'postgres',
    ssl: true
  }
)
module.exports = db
