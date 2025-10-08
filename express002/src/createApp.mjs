import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import routes from "./routes/index.mjs";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser("Hello World!"));
  app.use(
    session({
      secret: "abolfazl coding",
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 60000 * 60 },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes);

  return app;
}
