const mongoose = require("mongoose");

const prouctSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const Product = mongoose.model("product",prouctSchema)

module.exports = Product;