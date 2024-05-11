const cartModel = require('../models/cart');
const productModel = require('../models/products');

 
// exports.showCartData = async (req, res) => {
//     try {
//         const userId = req.user._id; 
        
//         const cart = await cartModel.findOne({ userId }).populate('products');
        
//         if (!cart) {
//             return res.json({ message: 'Cart is empty' });
//         }

//         res.json(cart);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

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

    