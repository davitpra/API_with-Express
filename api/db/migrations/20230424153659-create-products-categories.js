'use strict';

const { CATEGORY_TABLE } = require('../models/category.model');
const { PRODUCT_TABLE } = require('../models/product.model');
const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORY_TABLE, {
      // El esquema define la estructura de la BD.
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    })

    await queryInterface.createTable(PRODUCT_TABLE,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        image: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        description: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        price: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: 'created_at',
          defaultValue: Sequelize.NOW,
        },
        categoryId: {
          field: 'category_id',
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: CATEGORY_TABLE,
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
