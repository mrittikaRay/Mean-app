const productModel = require('../models/products');
const mongoose = require('mongoose');

exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find();

        const productsWithImageUrls = products.map(product => {
            const imageUrl = `http://localhost:3000/${product.imageUrl}`;
            return {
                ...product.toJSON(),
                imageUrl
            };
        });

        res.json(productsWithImageUrls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.getProductById = async (req,res) =>{
//     try{
//         const productId = req.params.productId;

//         const product = await productModel.findById(productId);
//         if(!product){
//             res.status(404).json({ error: 'Product not found'})
//         }
//         res.json(product);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// exports.getProductById = async (req, res) => {
//     try {
//         const productId = req.params.productId;
//         console.log(productId);
//         const product = await productModel.findById(productId);
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }
//         res.json(product);
//         console.log(product);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(productId); 
        const product = await productModel.findOne({ _id: productId }); 
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



