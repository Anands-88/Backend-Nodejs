const express = require("express")

const app = express()

app.get("",(request,response) => {

    return response.send("Hello")

})

app.get("/books",(req,res) => {
    
    return res.send({book_one:"hello",
                    book_two:"welcome",
                    book_three:"to the",
                    book_four:"8888 Port"})
})

app.listen(8888,() => {
    console.log("First live server on 8888")
})