import express from "express";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import conversationRouter from "./modules/conversation/conversation.router.js";
import messageRouter from "./modules/message/message.router.js";

const appRouter = express.Router();

appRouter.use("/v1/auth", authRouter);
appRouter.use("/v1/user", userRouter);
appRouter.use("/v1/conversation", conversationRouter);
appRouter.use("/v1/message", messageRouter);

export default appRouter;
