var express = require('express');
var router = express.Router();
const cartController = require('../controller/cartController')
const productController = require('../controller/productController')


router.get('/products',productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.get('/cart',cartController.showCartData);
router.post('/cart/add/:productId',cartController.addToCart);
router.delete('/cart/delete/:productId', cartController.removeFromCart);


module.exports = router;
