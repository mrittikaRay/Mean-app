const cartModel = require('../models/cart');
const productModel = require('../models/products');


exports.showCartData = async (req, res) => {
    try {
        const { userId } = req.body;
        const cartData = await cartModel.findById(userId);

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

exports.updateQtyInCart = async (req,res) =>{
    try{
        const productId = req.params.productId;
        console.log(productId);
        const { quantity } = req.body;

        let cart = await cartModel.findOne();

        if(!cart){
            return res.status(404).json({ error: 'Cart not found' });

        }

        const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
            if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
            }

            cart.products[productIndex].quantity = quantity;
            await cart.save();

            res.json({ message: 'Quantity updated in cart successfully' });



    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// cartController.js



    