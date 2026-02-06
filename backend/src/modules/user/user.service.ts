import bcrypt from "bcryptjs";
import { ApiError } from "$/middlewares/errorHandler.js";
import { prisma } from "$/prisma/prisma.js";
import { uploadToCloudinary } from "$/utils/fileUploader.js";
import { TRegisterUserSchema } from "./user.schema.js";
import { Prisma } from "$/prisma/generated/client.js";

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

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      ...(profilePhoto ? { photo: profilePhoto } : {}),
    },
  });
  return newUser;
};

const getUsersForAddNewChat = async (
  currentUserId: string,
  query: string,
  page?: number,
) => {
  const limit = 10;
  const pageNumber = page ?? 1;
  const skip = (pageNumber - 1) * limit;

  const OR: Prisma.UserWhereInput["OR"] = [
    {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    {
      email: {
        contains: query,
        mode: "insensitive",
      },
    },
  ];

  const totalUsers = await prisma.user.count({
    where: { OR },
  });

  let users = await prisma.user.findMany({
    where: {
      OR,
    },
    take: limit,
    skip,
    select: {
      name: true,
      photo: true,
      id: true,
    },
  });

  users = await Promise.all(
    users.map(async (user) => {
      const conversation = await prisma.conversation.findFirst({
        where: {
          OR: [
            { creatorId: currentUserId, participantId: user.id },
            { creatorId: user.id, participantId: currentUserId },
          ],
        },
      });

      return {
        ...user,
        hasConversation: !!conversation,
        conversationId: conversation?.id ?? null,
      };
    }),
  );

  const totalPages = Math.ceil(totalUsers / limit);
  const hasPrevPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

  return {
    users,
    meta: {
      totalPages,
      currentPage: pageNumber,
      prevPage: hasPrevPage ? pageNumber - 1 : null,
      nextPage: hasNextPage ? pageNumber + 1 : null,
      hasPrevPage,
      hasNextPage,
    },
  };
};

const userService = {
  registerUser,
  getUsersForAddNewChat,
};

export default userService;
