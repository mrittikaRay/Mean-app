const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName   : { type: String , required: true, trim: true },   
    userEmail  : { type: String , required: true, trim: true },
    password   : { type: String , required: true },
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;