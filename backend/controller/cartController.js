const cartModel = require('../models/cart');
const productModel = require('../models/products');

 
exports.showCartData = async (req, res) => {
    try {
        const cartData = await cartModel.find();

        if (!cartData) {
            return res.json({});
        }

        res.json(cartData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};




    exports.addToCart = async (req, res) => {
        try {
            const productId = req.params.productId;
            
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            
            let cart = await cartModel.findOne(); 
            if (!cart) {
                cart = new cartModel({
                    products: []
                });
            }
            
            cart.products.push(product);
            await cart.save();
            
            res.json({ message: 'Product added to cart successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    
    
    

    exports.removeFromCart = async (req, res) => {
        try {
            const productId = req.params.productId;
            
            // Find the cart that contains the product to be removed
            let cart = await cartModel.findOne({ 'products._id': productId }); 
            
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }
            
            // Remove the product from the cart's products array
            cart.products = cart.products.filter(item => item._id.toString() !== productId);
            
            // Save the updated cart
            await cart.save();
            
            // Send success response
            res.json({ message: 'Product removed from cart successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    