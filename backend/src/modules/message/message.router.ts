import validateSchema from "$/middlewares/validateSchema.js";
import express from "express";
import messageController from "./message.controller.js";
import { createMessageSchema } from "./message.schema.js";
import checkAuth from "$/middlewares/checkAuth.js";
import { uploader } from "$/utils/fileUploader.js";

const messageRouter = express.Router();

// Create Any message
messageRouter.post(
  "/v1/create",
  checkAuth,
  uploader(
    ["image/png", "image/jpeg", "image/jpg"],
    100 * 1024,
    "Only JPG, JPEG, and PNG image files are allowed.",
    3,
  ).array("attachments", 3),
  validateSchema(createMessageSchema),
  messageController.createMessage,
);

// Delete Any message
messageRouter.delete(
  "/v1/delete/:messageId",
  checkAuth,
  messageController.deleteMessage,
);

export default messageRouter;
