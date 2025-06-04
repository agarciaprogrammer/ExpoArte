const express = require('express');
const router = express.Router();
const doorSaleController = require('../controllers/doorSaleController');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['door', 'admin']), doorSaleController.getAll);
router.post('/', roleMiddleware(['door', 'admin']), doorSaleController.create);
router.put('/:id', roleMiddleware(['door', 'admin']), doorSaleController.update);
router.delete('/:id', roleMiddleware(['door', 'admin']), doorSaleController.remove);

module.exports = router;