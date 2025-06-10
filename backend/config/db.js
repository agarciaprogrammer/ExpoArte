const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelizeConfig;

if (process.env.DATABASE_URL) {
  // Configuración para Render (producción)
  sequelizeConfig = {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  };
} else {
  // Configuración para desarrollo local
  sequelizeConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: true
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL || sequelizeConfig);

module.exports = sequelize;