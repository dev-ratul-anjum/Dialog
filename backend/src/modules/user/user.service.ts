import bcrypt from "bcryptjs";
import { ApiError } from "$/middlewares/errorHandler.js";
import { prisma } from "$/prisma/prisma.js";
import { uploadToCloudinary } from "$/utils/fileUploader.js";
import { TRegisterUserSchema } from "./user.schema.js";

const registerUser = async (
  data: TRegisterUserSchema,
  file?: Express.Multer.File,
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "This email is already registered.", "email");
  }

  let profilePhoto: null | string = null;
  if (file) {
    const result = await uploadToCloudinary(file);
    profilePhoto = result.secure_url;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      ...(profilePhoto ? { photo: profilePhoto } : {}),
    },
  });
};

const userService = {
  registerUser,
};

export default userService;
