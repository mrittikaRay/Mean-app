const cartModel = require('../models/cart');
const productModel = require('../models/products');

 
exports.showCartData = async (req, res) => {
    try {
        const userId = req.user._id; 
        
        const cart = await cartModel.findOne({ userId }).populate('products');
        
        if (!cart) {
            return res.json({ message: 'Cart is empty' });
        }

        res.json(cart);
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
            const userId = req.user._id;
            
            let cart = await cartModel.findOne({userId, 'products._id': productId }); 
            
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }
            
            cart.products = cart.products.filter(item => item._id.toString() !== productId);
            
            await cart.save();
            
            res.json({ message: 'Product removed from cart successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    