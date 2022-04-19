const express = require("express");

const connect = require("./config/database")

const app = express()

app.use(express.json())

const productController = require("./controller/product_controller")

app.use("/products",productController)

app.listen(8290,async()=>
{
    try{
        await connect()
        console.log("Listening Port NUmber 8290")
    }
    catch(error)
    {
        console.log("ERROR",error)
    }
})