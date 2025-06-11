const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');

// Routes (require)
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const expenseRoutes = require('./routes/expense.routes');
const doorSaleRoutes = require('./routes/doorSale.routes');
const presaleRoutes = require('./routes/presale.routes');
const errorHandler = require('./middleware/errorHandler');
const settingRoutes = require('./routes/setting.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
app.set('trust proxy', 1);

// Allowed origins para CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://expo-arte-phi.vercel.app'
];

// Middleware CORS con función para validar origen dinámicamente
app.use(cors({
  origin: function(origin, callback){
    // Permitir requests sin origin (ej. Postman, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `El CORS no está permitido para el origen: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // si usás cookies o auth con token
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/doorsales', doorSaleRoutes);
app.use('/api/presales', presaleRoutes);
app.use('/api/config', settingRoutes);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
