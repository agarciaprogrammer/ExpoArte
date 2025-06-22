const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la base de datos origen (Render)
const sourceDb = new Sequelize(process.env.RENDER_DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Configuración de la base de datos destino (Supabase)
const targetDb = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
});

async function migrateData() {
  try {
    console.log('Iniciando migración de datos...');
    
    // Aquí puedes agregar la lógica para migrar datos específicos
    // Por ejemplo:
    // const users = await sourceDb.query('SELECT * FROM users');
    // await targetDb.query('INSERT INTO users SELECT * FROM users');
    
    console.log('Migración completada exitosamente');
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    await sourceDb.close();
    await targetDb.close();
  }
}

// Solo ejecutar si se llama directamente
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData }; 