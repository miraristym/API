//import library
const express = require('express');
const router = express.Router();

//import the middleware
const checkAuth = require('../middleware/check-auth');

//import controllers
const OrdersController = require('../controllers/order');

//handle incoming GET request
router.get('/', checkAuth, OrdersController.orders_get_all);
router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

//handle incoming POST request
router.post('/', checkAuth, OrdersController.orders_create_order);

//handle incoming DELETE request
router.delete('/:orderId', checkAuth, OrdersController.orders_del_order);

//exprot router
module.exports = router;