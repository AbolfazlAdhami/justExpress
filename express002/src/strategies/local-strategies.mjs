import passport from "passport";
import User from "../models/User.mjs";
import { Strategy } from "passport-local";
import { comparePassword } from "../utils/helpers.mjs";
// import { users } from "../data/users.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found!");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });

      if (!findUser) throw new Error("User not found");

      if (!comparePassword(password, findUser.password)) throw new Error("Bad Credentials");

      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  }),
);
