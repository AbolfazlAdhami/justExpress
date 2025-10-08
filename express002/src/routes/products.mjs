import { Router } from "express";
import { products } from "../data/products.mjs";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.signedCookies);
  res.send(products);
});

export default router;
