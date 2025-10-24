import passport from "passport";
import { Router } from "express";

const router = Router();

router.post("/api/auth", (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
  res.sendStatus(200);
});

router.get("/api/auth/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/api/auth/logout", (req, res) => {});

router.post("/api/discord", passport.authenticate("local"), (req, res) => res.sendStatus(200));
router.post("/api/auth/discord/redirect", passport.authenticate("local"), (req, res) => res.sendStatus(200));

export default router;
