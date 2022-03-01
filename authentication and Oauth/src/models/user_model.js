const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name:{type:String,required:true},
    mobile:{type:Number,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {  // before saving details, hashing password
  if (!this.isModified("password")) return next();

  // secret , salt => sdkfhsdkfh , secret + sdkfhsdkfh => dskfgkcskdfgsdkfsdf
  // salt
  // hashing rounds =>
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password); // if user for logging in checking password 
};

const User = mongoose.model("user", userSchema); // user => users

module.exports = User;
