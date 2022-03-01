
const express = require("express");

const app = express();

// app.use(books) // Using Middleware 

app.get("/books",allBooks,(req,res) => { // Method and router(/books)
    console.log("Fetching all Books")
    res.send("Fetching all Books")
})

app.get("/book/:name",singleBook,(req,res) => { // second router /book
    res.send({"bookName":req.params.name})
})

function allBooks(req,res,next)
{
    console.log("Middle Ware before Fetching all Books")
    next()
    console.log("Middle Ware after Fetching all Books")
}

function singleBook(req,res,next)
{
    req.name = req.params.name
    console.log("book",req.name)
    next()
    
}

app.listen(4444,() =>{
    console.log("Listening Port 4444")
})

// - GET /book/:name ( :name is a variable and we will learn this later in the course 
//     but this means if you do book/GameOfThrones or book/HarryPotter then all of them will hit 
//     this API so we need a middleware singleBook for this api which will fetch the name of the book and 
//     for that you need to do req.params.name ( we will learn this too in future ) and you have to add 
//     this book name to the request like req.name = req.params.name and then in the route handler you need 
//     to return json like {bookName: req.name}.

// const express = require("express");

// const app = express();

// // admin, user, student, teacher, IA, SDE1
// app.get("/user", logger1("admin"), (req, res) => {
//   res.send(req.role);
// });

// function logger1(role) {
//   return function (req, res, next) {
//     if (role == "admin") {
//       req.role = "admin";
//     } else {
//       req.role = "user";
//     }
//     next();
//   };
// }

// app.listen(2345, function () {
//   console.log("listening on port 2345");









// const express = require("express");

// const app = express();

// app.use(logger1);
// app.use(logger2);

// app.get("/user", (req, res) => {
//   return res.send("Hello");
// });

// app.get("/users", (req, res) => {
//   console.log("route handler");
//   res.send("All users");
// });

// function logger1(req, res, next) {
//   console.log("before middleware 1");
//   next();
//   console.log("after middleware 1");
// }

// function logger2(req, res, next) {
//   console.log("before middleware 2");
//   next();
//   console.log("after middleware 2");
// }

// app.listen(2345, function () {
//   console.log("listening on port 2345");
// });