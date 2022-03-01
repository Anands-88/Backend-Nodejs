const express = require("express");

const connect = require("./configs/db");

const postController = require("./controllers/post_controller");
const { register, login } = require("./controllers/auth_controller");

const app = express();

app.use(express.json());

// /register
app.post("/register", register);
app.get("/register",register)
// .login
app.post("/login", login);

app.use("/posts", postController);

app.listen(7383, async () => {
  try {
    await connect();
  } catch (err) {
    console.error("ERROR",err.message);
  }
  console.log("listening on port 7383");
});
