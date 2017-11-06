const Sequelize = require('sequelize')
const db = require('../db')

const session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  userId: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000)
});

function extendDefaultFields(defaults, session) {
  console.log('///////////////////////////////////////////');
  console.log(session.userId);
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId
  };
}

module.exports = session
