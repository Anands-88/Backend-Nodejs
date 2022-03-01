const express = require("express");
const connect = require("./config/db");
const app = express();

const sectionController = require("./controller/section_controller")
const bookController = require("./controller/book_controller")
const authorController = require("./controller/author_controller")

app.use(express.json());

app.use("/sections",sectionController)
app.use("/books",bookController)
app.use("/authors",authorController)

const port = 7489
app.listen(port, async() => 
{
    try{
        await connect();
        console.log(`Listening Port Number ${port}`)
    }
    catch(error)
    {
        console.error(error)
    }
})

