import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/User.mjs";

export default function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "User Not Found" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return done(null, false, { message: "Invalid Passport" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
