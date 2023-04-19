const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
//traemos el setupModels
const setupModels = require('../db/models/');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Se crea una instancia de Sequelize, ya gestiona el pooling.
const sequelize = new Sequelize(URI, {
   dialect: 'mysql',
    logging: true
  });
// iniciamos el setup
setupModels(sequelize);
//creamos la estructura con la tablas de Usersquema.
sequelize.sync();

module.exports = sequelize;
