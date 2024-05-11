const mongoose = require('mongoose');
const { Schema } = mongoose;
const productModel = require('./products');

const cartSchema = new Schema({
    products: [{
        product: {
            type: productModel.schema,
            required: true
        },
        quantity: {
            type: Number,
            default: 1 // Set default quantity to 1
        }
    }]
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;