import express from "express";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import conversationRouter from "./modules/conversation/conversation.router.js";
import messageRouter from "./modules/message/message.router.js";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/conversation", conversationRouter);
appRouter.use("/message", messageRouter);

export default appRouter;
