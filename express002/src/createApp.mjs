import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import passportConfig from "./config/passport.mjs";

import "./config/passport.mjs";
import routes from "./routes/index.mjs";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser("helloworld"));
  app.use(
    session({
      secret: "abolfazl coding",
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 60000 * 60 },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.)
  app.use(routes);
  return app;
}
