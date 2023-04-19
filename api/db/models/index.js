const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  //crea el esquema de datos con UserShema y conectate con sequelize.
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
