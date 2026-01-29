import { Request, Response } from "express";
import catchAsync from "$/utils/catchAsync.js";
import responseHandler from "$/utils/responseHandler.js";
import userService from "./user.service.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  await userService.registerUser(req.body, req.file);
  return responseHandler(res, 201, {
    success: true,
    message: "User Registered Successfully!",
  });
});

const userController = {
  registerUser,
};

export default userController;
