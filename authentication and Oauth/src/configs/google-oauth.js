require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4: uuidv4 } = require("uuid"); // to create random passwords

const User = require("../models/user_model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8539/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {

      let user = await User.findOne({ email: profile?.email }).lean().exec();

      if (!user) {
        user = await User.create({
          name:profile?.given_name,
          mobile:profile?.sub,
          email: profile?.email,
          password: uuidv4(),
          role: ["seller"],
        });
      }

      return done(null, user);
    }
  )
);

module.exports = passport;
