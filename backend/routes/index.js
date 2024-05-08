var express = require('express');
var router = express.Router();
const cartController = require('../controller/cartController')
const productController = require('../controller/productController')
const userController = require('../controller/userController')


router.get('/products',productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.get('/cart',cartController.showCartData);
router.post('/cart/add/:productId',cartController.addToCart);
router.delete('/cart/delete/:productId', cartController.removeFromCart);
router.post('/user/register',userController.userRegister);


module.exports = router;
