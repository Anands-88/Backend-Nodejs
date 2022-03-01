const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        name:{type:String,required:true}
    },
    {
        versionKey:false,
        timeseries:true,
        timestamps:true
    }
);

const Section