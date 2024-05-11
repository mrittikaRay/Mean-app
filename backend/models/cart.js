const mongoose = require('mongoose');
const { Schema } = mongoose;
const productModel = require('./products');

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [productModel.schema]
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
