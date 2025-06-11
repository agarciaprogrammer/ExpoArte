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
const settingRotes = require('./routes/setting.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Routes (app.use)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/doorsales', doorSaleRoutes);
app.use('/api/presales', presaleRoutes);
app.use('/api/config', settingRotes);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route
const allowedOrigins = [
  'http://localhost:5173',
  'https://expo-arte-phi.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // si usás cookies o auth con token
}));

module.exports = app;
