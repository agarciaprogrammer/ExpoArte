const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa');

    // Sincroniza modelos solo si no estamos en producción
    if (process.env.NODE_ENV === 'production') {
  // Ejecutar sync solo una vez, y luego comentar esta línea
      await sequelize.sync();
      console.log('🔄 Modelos sincronizados en producción');
    } else {
      await sequelize.sync();
      console.log('🔄 Modelos sincronizados en desarrollo');
    }


    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      
      if (process.env.NODE_ENV === 'production') {
        console.log(`Servidor en modo producción en el puerto ${PORT}`);
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log(`🔗 http://localhost:${PORT}`);
      }
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();