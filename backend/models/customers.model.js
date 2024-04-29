const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({

    name: { type: String, required: true, trim: true },   
    lastName: { type: String, required: true, trim: true },
    phNo: {type:Number, required: true},
    dob: {type:Date, required: true},
    email: { type: String, required: true, }
})

const customerModel = mongoose.model('Customer', customerSchema);

module.exports = customerModel;