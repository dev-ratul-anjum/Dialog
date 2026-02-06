import { Request, Response } from "express";
import catchAsync from "$/utils/catchAsync.js";
import responseHandler from "$/utils/responseHandler.js";
import conversationService from "./conversation.service.js";
import { ApiError } from "$/middlewares/errorHandler.js";

const createConversation = catchAsync(async (req: Request, res: Response) => {
  const creatorId = req.user?.id!;
  await conversationService.createConversation(req.body, creatorId);
  return responseHandler(res, 201, {
    success: true,
    message: "Conversation created Successfully!",
  });
});
const deleteConversation = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const conversationId = req.params.conversationId;

  if (!conversationId || typeof conversationId !== "string") {
    throw new ApiError(400, "Required parameters not provided");
  }
  await conversationService.deleteConversation(userId, conversationId);
  return responseHandler(res, 200, {
    success: true,
    message: "Conversation deleted Successfully!",
  });
});

// Get Conversations
const getConversations = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const { query, page } = req.query;
  const options: { query?: string; page?: number } = {};

  if (query && typeof query === "string") options.query = query;
  if (page && typeof page === "string")
    options.page = !isNaN(Number(page)) ? Number(page) : undefined;

  const data = await conversationService.getConversations(userId, options);
  return responseHandler(res, 200, {
    success: true,
    message: "Conversations retrive Successfully!",
    data,
  });
});
const conversationController = {
  createConversation,
  deleteConversation,
  getConversations,
};

export default conversationController;
