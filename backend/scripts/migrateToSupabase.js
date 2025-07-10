const { Sequelize } = require('sequelize');
require('dotenv').config();

async function migrateData() {
  try {
    console.log('🚀 Iniciando migración de datos de Render a Supabase...');
    
    // Verificar que tengamos ambas URLs
    if (!process.env.RENDER_DATABASE_URL) {
      console.log('❌ RENDER_DATABASE_URL no está configurada');
      console.log('💡 Agrega RENDER_DATABASE_URL en tu .env con la URL de Render');
      return;
    }
    
    if (!process.env.DATABASE_URL) {
      console.log('❌ DATABASE_URL no está configurada');
      return;
    }

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

    await sourceDb.authenticate();
    console.log('✅ Conexión a Render exitosa');
    
    await targetDb.authenticate();
    console.log('✅ Conexión a Supabase exitosa');

    // Tablas a migrar
    const tables = ['Users', 'Expenses', 'DoorSales', 'Preorders', 'Settings', 'Attendances'];
    
    for (const table of tables) {
      try {
        console.log(`\n📋 Migrando tabla: ${table}`);
        
        // Verificar si hay datos en la tabla origen
        const [countResult] = await sourceDb.query(`SELECT COUNT(*) as count FROM "${table}"`);
        const count = parseInt(countResult[0].count);
        
        if (count === 0) {
          console.log(`   ⏭️  ${table}: No hay datos para migrar`);
          continue;
        }
        
        console.log(`   📊 ${table}: ${count} registros encontrados`);
        
        // Obtener datos de la tabla origen
        const [data] = await sourceDb.query(`SELECT * FROM "${table}"`);
        
        // Verificar si la tabla destino está vacía
        const [targetCountResult] = await targetDb.query(`SELECT COUNT(*) as count FROM "${table}"`);
        const targetCount = parseInt(targetCountResult[0].count);
        
        if (targetCount > 0) {
          console.log(`   ⚠️  ${table}: Ya hay ${targetCount} registros en Supabase`);
          console.log(`   💡 Saltando migración para evitar duplicados`);
          continue;
        }
        
        // Migrar datos
        if (data.length > 0) {
          // Construir la consulta INSERT
          const columns = Object.keys(data[0]);
          const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
          const columnNames = columns.map(col => `"${col}"`).join(', ');
          
          const insertQuery = `INSERT INTO "${table}" (${columnNames}) VALUES (${placeholders})`;
          
          // Insertar cada registro
          for (const row of data) {
            const values = columns.map(col => row[col]);
            await targetDb.query(insertQuery, { bind: values });
          }
          
          console.log(`   ✅ ${table}: ${data.length} registros migrados exitosamente`);
        }
        
      } catch (error) {
        console.error(`   ❌ Error migrando ${table}:`, error.message);
      }
    }
    
    console.log('\n🎉 Migración completada');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    try {
      await sourceDb.close();
      await targetDb.close();
    } catch (e) {
      console.log('⚠️  Error cerrando conexiones:', e.message);
    }
  }
}

// Solo ejecutar si se llama directamente
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData }; 