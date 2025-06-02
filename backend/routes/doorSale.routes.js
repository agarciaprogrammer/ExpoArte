const express = require('express');
const router = express.Router();
const doorSaleController = require('../controllers/doorSaleController');

router.get('/', doorSaleController.getAll);
router.post('/', doorSaleController.create);
router.put('/:id', doorSaleController.update);
router.delete('/:id', doorSaleController.remove);

module.exports = router;