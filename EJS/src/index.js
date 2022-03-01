const express = require('express');  
const app = express();
app.use(express.json());
require("dotenv").config();
const connect = require('./configs/db');

const productController = require('./controllers/product_controller');

app.use('/product', productController);

app.set("view engine","ejs") // looks all views as ejs 

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

port = process.env.PORT || 3000;

app.listen(port,async()=>{
try{
    await connect();
    console.log(`Listening on ${port}`);
}
catch(error)
{
    console.error("ERROR",error)
}

});
