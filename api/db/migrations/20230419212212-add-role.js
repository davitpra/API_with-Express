'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    // para anadir se indica la tabla, el campo y el esquema con el campo
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role)
  },
 // codigo de roolback
 down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'role')
  }
};
