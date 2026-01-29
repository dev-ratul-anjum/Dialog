import express from "express";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";

const appRouter = express.Router();

appRouter.use("/v1/auth", authRouter);
appRouter.use("/v1/user", userRouter);

export default appRouter;
