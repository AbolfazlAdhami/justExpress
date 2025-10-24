import { Router } from "express";
import { products } from "../data/products.mjs";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.signedCookies);
  if (req.signedCookies.hello && req.signedCookies.hello === "hello") return res.send([{ id: 123, name: "chicken breast", price: 12.99 }]);

  return res.status(403).send({ message: "Sorry. You need the correct cookie" });

});

export default router;
