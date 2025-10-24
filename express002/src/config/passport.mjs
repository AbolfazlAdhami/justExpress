import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/User.mjs";

export default function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne;
      } catch (error) {}
    })
  );
  passport.serializeUser();
  passport.deserializeUser();
}
