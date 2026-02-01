import express from "express";
import validateSchema from "$/middlewares/validateSchema.js";
import { loginUserSchema } from "./auth.schema.js";
import authController from "./auth.controller.js";
import checkAuth from "$/middlewares/checkAuth.js";

const authRouter = express.Router();

// Login Any User
authRouter.post(
  "/login",
  validateSchema(loginUserSchema),
  authController.loginUser,
);

// Logout Any User
authRouter.post("/logout", checkAuth, authController.logoutUser);

// Get Current User
authRouter.get("/me", checkAuth, authController.getCurrentUser);

export default authRouter;
