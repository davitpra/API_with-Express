'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');

module.exports = {
  //creamos la tabla
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },
  //con esto se borra la tabla
  down: async (queryInterface) => {
    await queryInterface.drop(USER_TABLE);
  },
};
