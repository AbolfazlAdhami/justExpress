import { Router } from "express";
import productsRouter from "./products.mjs";
import userRouter from "./users.mjs";

const router = Router();

router.use(productsRouter);
router.use(userRouter);

export default router;
