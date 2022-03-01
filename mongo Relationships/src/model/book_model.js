const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        body:{type:String,require:true},
        section_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"section",
            required:true
        },
        author_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"author",
            required:true
        }
    },
    {
        versionKey:false,
        timeseries:true,
        timestamps:true
    }
);

const Book = mongoose.model("book",bookSchema);

module.exports = Book;