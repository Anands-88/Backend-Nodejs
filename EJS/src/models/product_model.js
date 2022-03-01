const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        name: {type:String,required:true},
        amount: {type:Number,required:true}
        // image_url: {type:String}
})

module.exports = mongoose.model("product",productSchema)
