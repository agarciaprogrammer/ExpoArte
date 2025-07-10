const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
require('dotenv').config();

async function seedSupabaseUsers() {
  try {
    console.log('🌱 Creando usuarios administradores en Supabase...');
    
    if (!process.env.DATABASE_URL) {
      console.log('❌ DATABASE_URL no está configurada');
      return;
    }

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

    // Verificar si la tabla Users existe
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Users'
    `);

    if (tables.length === 0) {
      console.log('❌ La tabla Users no existe en Supabase');
      console.log('💡 Primero necesitas crear las tablas ejecutando la aplicación');
      return;
    }

    // Crear hashes de contraseñas
    const hashedPassword1 = await bcrypt.hash('adminexpoalmagro', 10);
    const hashedPassword2 = await bcrypt.hash('puerta', 10);

    // Verificar si los usuarios ya existen
    const [existingUsers] = await sequelize.query(`
      SELECT username FROM "Users" WHERE username IN ('admin', 'puerta')
    `);

    const existingUsernames = existingUsers.map(user => user.username);
    console.log(`📋 Usuarios existentes: ${existingUsernames.join(', ') || 'ninguno'}`);

    // Crear usuario admin si no existe
    if (!existingUsernames.includes('admin')) {
      await sequelize.query(`
        INSERT INTO "Users" (username, password, role, "createdAt", "updatedAt")
        VALUES ($1, $2, $3, NOW(), NOW())
      `, {
        bind: ['admin', hashedPassword1, 'admin']
      });
      console.log('✅ Usuario admin creado exitosamente');
    } else {
      console.log('⏭️  Usuario admin ya existe');
    }

    // Crear usuario puerta si no existe
    if (!existingUsernames.includes('puerta')) {
      await sequelize.query(`
        INSERT INTO "Users" (username, password, role, "createdAt", "updatedAt")
        VALUES ($1, $2, $3, NOW(), NOW())
      `, {
        bind: ['puerta', hashedPassword2, 'door']
      });
      console.log('✅ Usuario puerta creado exitosamente');
    } else {
      console.log('⏭️  Usuario puerta ya existe');
    }

    // Mostrar usuarios finales
    const [finalUsers] = await sequelize.query(`
      SELECT username, role FROM "Users" ORDER BY username
    `);

    console.log('\n📋 Usuarios en Supabase:');
    finalUsers.forEach(user => {
      console.log(`   👤 ${user.username} (${user.role})`);
    });

    console.log('\n🔑 Credenciales de acceso:');
    console.log('   Admin: username=admin, password=adminexpo');
    console.log('   Puerta: username=puerta, password=puertaexpo');

    await sequelize.close();
    console.log('\n🎉 Proceso completado exitosamente');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Solo ejecutar si se llama directamente
if (require.main === module) {
  seedSupabaseUsers();
}

module.exports = { seedSupabaseUsers }; 