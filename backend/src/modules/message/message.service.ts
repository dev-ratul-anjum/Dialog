import { ApiError } from "$/middlewares/errorHandler.js";
import { Prisma } from "$/prisma/generated/client.js";
import { prisma } from "$/prisma/prisma.js";
import { formatContextualDateTime } from "$/utils/dateFormatter.js";
import { TCreateMessageSchema } from "./message.schema.js";

const createMessage = async (
  data: TCreateMessageSchema,
  senderId: string,
  attachments: string[],
) => {
  await prisma.message.create({
    data: {
      ...(data.text ? { text: data.text } : {}),
      attachments,
      senderId,
      receiverId: data.receiverId,
      conversationId: data.conversationId,
    },
  });
};

const deleteMessage = async (userId: string, messageId: string) => {
  await prisma.message.delete({
    where: {
      id: messageId,
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
  });
};

const getConversationMessages = async (
  currentUserId: string,
  conversationId: string,
  page?: number,
) => {
  const pageNumber = page || 1;
  const limit = 15;
  const skip = (pageNumber - 1) * limit;

  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
      participant: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
    },
  });
  if (!conversation) {
    throw new ApiError(404, "Conversation not found.");
  }

  const where: Prisma.MessageWhereInput = {
    conversationId,
    OR: [{ senderId: currentUserId }, { receiverId: currentUserId }],
  };

  const messagesCount = await prisma.message.count({
    where,
  });
  const messages = await prisma.message.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      text: true,
      attachments: true,
      updatedAt: true,
      senderId: true,
    },
  });
  const finalMessages = messages.map((msg) => {
    return {
      ...msg,
      updatedAt: formatContextualDateTime(msg.updatedAt),
    };
  });

  const totalPages = Math.ceil(messagesCount / limit);
  const hasNextPage = totalPages > pageNumber;
  const hasPrevPage = pageNumber > 1;

  const isCreator = conversation.creator.id === currentUserId;
  const otherUser = isCreator ? conversation.participant : conversation.creator;

  return {
    participantId: otherUser.id,
    participantName: otherUser.name,
    participantPhoto: otherUser.photo,
    messages: finalMessages,
    meta: {
      totalMessages: messagesCount,
      currentPage: pageNumber,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? pageNumber + 1 : null,
      prevPage: hasPrevPage ? pageNumber - 1 : null,
    },
  };
};

const messageService = {
  createMessage,
  deleteMessage,
  getConversationMessages,
};

export default messageService;
