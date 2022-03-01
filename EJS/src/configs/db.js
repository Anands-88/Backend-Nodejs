// import mongoose 
const mongoose = require('mongoose');   


// create connect function to connect to database
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/myejs')
};

//exporting the connect function in index.js
module.exports = connect;
