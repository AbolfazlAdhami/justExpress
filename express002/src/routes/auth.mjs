import passport from "passport";
import { Router } from "express";

const router = Router();

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

router.get("/api/auth/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
});

router.post("/api/discord", passport.authenticate("discord"));

router.post("/api/auth/discord/redirect", passport.authenticate("discord"), (req, res) => res.sendStatus(200));

export default router;
