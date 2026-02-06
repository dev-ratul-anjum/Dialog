import { Request, Response } from "express";
import catchAsync from "$/utils/catchAsync.js";
import responseHandler from "$/utils/responseHandler.js";
import userService from "./user.service.js";
import { createJwtToken, setAuthCookie } from "$/utils/authHelpers.js";
import { ApiError } from "$/middlewares/errorHandler.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await userService.registerUser(req.body, req.file);
  const token = createJwtToken(newUser.id);
  setAuthCookie(res, token);

  return responseHandler(res, 201, {
    success: true,
    message: "User Registered Successfully!",
  });
});

const getUsersForAddNewChat = catchAsync(
  async (req: Request, res: Response) => {
    let { query, page } = req.query;

    if (!query || typeof query !== "string") {
      throw new ApiError(400, "Required query not provided");
    }
    const pageNumber =
      typeof page === "string" && !isNaN(Number(page))
        ? Number(page)
        : undefined;

    const userId = req.user?.id;

    const data = await userService.getUsersForAddNewChat(
      userId!,
      query,
      pageNumber,
    );

    return responseHandler(res, 200, {
      success: true,
      message: "Users retrive successfull!",
      data,
    });
  },
);

const userController = {
  registerUser,
  getUsersForAddNewChat,
};

export default userController;
