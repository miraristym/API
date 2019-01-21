//import library
const express = require('express');
const mongoose = require('mongoose');

//import router
const router = express.Router();

//import the middleware
const checkAuth = require('../middleware/check-auth');

//import controllers
const ProductsController = require('../controllers/products');

//Handle incoming GET request
router.get('/', ProductsController.products_get_all);
router.get('/:productId', ProductsController.products_get_product);

//Handle incoming POST request
router.post("/", checkAuth, ProductsController.products_create_product);

//Handle incoming UPDATE request
router.patch('/:productId', checkAuth, ProductsController.products_update_product);

//Handle incoming DELETE request
router.delete('/:productId', checkAuth, ProductsController.products_del_product);

//exprot router
module.exports = router;