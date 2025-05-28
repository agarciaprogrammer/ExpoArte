const express = require('express');
const router = express.Router();
const doorSaleController = require('../controllers/doorSaleController');

router.post('/', doorSaleController.createDoorSale);
router.get('/', doorSaleController.getAllDoorSales);

module.exports = router;