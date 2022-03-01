const express = require("express");
const userController = require("./controller/user_controller")
const connect = require("./config/db")
const app = express();

app.use(express.json())
app.use("/users",userController)

app.listen(3718,async()=>
{
    try{
        await connect()
        console.log("Listening Port Number 3718")
    }
    catch(err)
    {
        console.error("error",err)
    }
})

