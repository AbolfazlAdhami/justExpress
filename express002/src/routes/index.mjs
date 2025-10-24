import { Router } from "express";
import productsRouter from "./products.mjs";
import userRouter from "./users.mjs";
import authRouter from "./auth.mjs";

const router = Router();

router.use(productsRouter);
router.use(userRouter);
router.use(authRouter);

export default router;
