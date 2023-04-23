'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/custumer.model');

module.exports = {
  //creamos la tabla
  up: async (queryInterface) => {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },
  //con esto se borra la tabla
  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};

