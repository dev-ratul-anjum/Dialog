import validateSchema from "$/middlewares/validateSchema.js";
import express from "express";
import { registerUserSchema } from "./user.schema.js";
import userController from "./user.controller.js";
import { uploader } from "$/utils/fileUploader.js";

const userRouter = express.Router();

// Register Any User
userRouter.post(
  "/register",
  uploader(
    ["image/png", "image/jpeg", "image/jpg"],
    100 * 1024,
    "Only JPG, JPEG, and PNG image files are allowed.",
  ).single("photo"),
  validateSchema(registerUserSchema),
  userController.registerUser,
);

export default userRouter;
