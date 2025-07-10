const { Sequelize } = require('sequelize');
require('dotenv').config();

async function checkRenderData() {
  try {
    console.log('🔍 Verificando datos en Render...');
    
    // URL de Render (necesitas agregar esta variable temporalmente)
    const renderUrl = process.env.RENDER_DATABASE_URL;
    
    if (!renderUrl) {
      console.log('❌ No tienes RENDER_DATABASE_URL configurada');
      console.log('💡 Agrega temporalmente RENDER_DATABASE_URL en tu .env con la URL de Render');
      return;
    }
    
    const sequelize = new Sequelize(renderUrl, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });

    await sequelize.authenticate();
    console.log('✅ Conexión a Render exitosa');

    // Verificar datos en cada tabla
    const tables = ['Users', 'Expenses', 'DoorSales', 'Preorders', 'Settings', 'Attendances'];
    
    for (const table of tables) {
      try {
        const [results] = await sequelize.query(`SELECT COUNT(*) as count FROM "${table}"`);
        const count = results[0].count;
        console.log(`📊 ${table}: ${count} registros`);
        
        if (count > 0) {
          // Mostrar algunos ejemplos
          const [samples] = await sequelize.query(`SELECT * FROM "${table}" LIMIT 3`);
          console.log(`   Ejemplos: ${samples.length} registros mostrados`);
        }
      } catch (error) {
        console.log(`❌ Error en ${table}: ${error.message}`);
      }
    }

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkRenderData(); 