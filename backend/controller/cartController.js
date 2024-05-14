const cartModel = require('../models/cart');
const productModel = require('../models/products');
const userModel = require('../models/user.model');


exports.showCartData = async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === undefined) {
            return res.status(400).json({ error: 'userId parameter is missing in the request params' });
        }
        
        const cart = await cartModel.find({ userId });

        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.showCartData = async (req, res) => {
    try {
        const { userId } = req.params;

        // Input validation
        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ error: 'Invalid userId parameter' });
        }

        const cart = await cartModel.find({ userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found for the specified user' });
        }

        // Format the response
        const formattedCart = {
            userId: cart.userId,
            products: cart.products, 
        };

        res.json({ cart: formattedCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};





exports.addToCart = async (req, res) => {
    try {
        const  productId  = req.params.productId;
        const { userId } = req.body;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({
                userId,
                products: [{ product, quantity: 1 }] // Add the product with quantity 1
            });
        } else {
            const existingProductIndex = cart.products.findIndex(item => item.product.equals(product._id));

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({ product, quantity: 1 });
            }
        }

        // Save the cart
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

        let cart = await cartModel.findOne({'products.product._id': productId }); 
        
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        cart.products = cart.products.filter(item => item.product._id.toString() !== productId);
        
        await cart.save();
        
        res.json({ message: 'Product removed from cart successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateQuantity = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { userId, quantity } = req.body;

        // Find the cart item and update quantity
        let cartQuery = { userId, "products.product._id": productId };
        const cart = await cartModel.findOne(cartQuery);

        if (!cart) {
            return res.status(404).json({ error: 'Cart or product not found' });
        }

        // Find the index of the product in the cart
        const productIndex = cart.products.findIndex(item => String(item.product._id) === productId);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        // Update the quantity of the product
        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.json({ message: 'Quantity updated successfully', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// cartController.js



    