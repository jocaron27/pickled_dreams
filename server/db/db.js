const Sequelize = require('sequelize')
const pkg = require('../../package.json');
const name = process.env.DATABASE_NAME || pkg.name;
const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:5432/${name}`;
const db = new Sequelize(connectionString, {
  logging: false    // lets Sequelize know we can use pg-native for ~30% more speed (if you have issues with pg-native feel free to take this out and work it back in later when we have time to help)
});

module.exports = db;
