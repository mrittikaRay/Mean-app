const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productName: { type: String , required: true, trim: true },   
    productType: { type: String , required: true, trim: true },
    price      : { type: Number , required: true },
    description: { type: String , required: true },
    imageUrl   : { type: String , required: true },
    available  : { type: Boolean, default : true } 
})

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;