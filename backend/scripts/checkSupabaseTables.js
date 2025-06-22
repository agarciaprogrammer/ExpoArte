const { Sequelize } = require('sequelize');
require('dotenv').config();

async function checkTables() {
  try {
    console.log('🔍 Verificando tablas en Supabase...');
    
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
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

    await sequelize.authenticate();
    console.log('✅ Conexión a Supabase exitosa');

    // Obtener lista de tablas
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('\n📋 Tablas existentes en Supabase:');
    if (results.length === 0) {
      console.log('❌ No hay tablas creadas');
    } else {
      results.forEach((row, index) => {
        console.log(`${index + 1}. ${row.table_name}`);
      });
    }

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkTables(); 