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
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Routes (app.use)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/doorsales', doorSaleRoutes);
app.use('/api/presales', presaleRoutes);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route
app.get('/', (req, res) => {
  res.send('ExpoArt API funcionando');
});

module.exports = app;
