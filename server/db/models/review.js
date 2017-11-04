const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    },
    defaultValue: 0
  },
  review_text: {
    type: Sequelize.TEXT
  }
});

module.exports = Review;
