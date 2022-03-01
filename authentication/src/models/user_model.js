const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  var hash = bcrypt.hashSync(this.password, 8); // to secure more , 8 is hashing times
  this.password = hash; // more times more secure less performance speed
  return next();
});

userSchema.methods.checkPassword = function (password) { // for login, check and comparing password
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema); // user => users

module.exports = User;
