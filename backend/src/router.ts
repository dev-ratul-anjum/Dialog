import express from "express";
import authRouter from "./modules/auth/auth.router.js";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);

export default appRouter;
