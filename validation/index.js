const express = require("express");

const app = express();

const connect = require("./config/db");
const userController = require("./controller/user_controller")

app.use(express.json())

app.use("/users",userController)

app.listen(8923,async () => {
    try{
        await connect()
        console.log("Listening Port 8923")
    }
    catch(error)
    {
        console.log("ERROR",error)
    }
    
})