import { prisma } from "$/prisma/prisma.js";
import { TCreateConversationSchema } from "./conversation.schema.js";
import { Prisma } from "$/prisma/generated/client.js";
import { getRelativeTime } from "$/utils/dateFormatter.js";
import { ApiError } from "$/middlewares/errorHandler.js";

const createConversation = async (
  data: TCreateConversationSchema,
  creatorId: string,
) => {
  const newConversation = await prisma.conversation.create({
    data: {
      creatorId,
      participantId: data.participantId,
    },
  });

  return newConversation.id;
};

const deleteConversation = async (userId: string, conversationId: string) => {
  await prisma.conversation.delete({
    where: {
      id: conversationId,
      OR: [{ creatorId: userId }, { participantId: userId }],
    },
  });
};

// Get Conversations
const getConversations = async (
  currentUserId: string,
  options: { query?: string; page?: number },
) => {
  const limit = 10;
  const pageNumber = options.page ?? 1;
  const skip = (pageNumber - 1) * limit;

  const where: Prisma.ConversationWhereInput = {
    OR: [
      {
        creatorId: currentUserId,
        ...(options.query
          ? {
              participant: {
                OR: [
                  {
                    name: {
                      contains: options.query,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: options.query,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            }
          : {}),
      },
      {
        participantId: currentUserId,
        ...(options.query
          ? {
              creator: {
                OR: [
                  {
                    name: {
                      contains: options.query,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: options.query,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            }
          : {}),
      },
    ],
  };

  const totalConversations = await prisma.conversation.count({
    where,
  });

  const conversations = await prisma.conversation.findMany({
    where,
    skip,
    take: limit,
    select: {
      id: true,
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
      messages: {
        orderBy: { updatedAt: "desc" },
        take: 1,
        select: {
          text: true,
          updatedAt: true,
          attachments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map only once for UI shape
  const formattedConversations = conversations.map((conv) => {
    const lastMessage = conv.messages[0]; // always 0 or undefined
    const isCreator = conv.creator.id === currentUserId;
    const otherUser = isCreator ? conv.participant : conv.creator;

    return {
      id: conv.id,
      participantName: otherUser.name,
      participantPhoto: otherUser.photo,
      lastMessage: lastMessage?.text ?? null,
      lastMessageAt: lastMessage?.updatedAt
        ? getRelativeTime(lastMessage.updatedAt)
        : null,
      attachments: lastMessage?.attachments?.length > 0 || false,
    };
  });

  const totalPages = Math.ceil(totalConversations / limit);
  const hasPrevPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

  return {
    conversations: formattedConversations,
    meta: {
      totalConversations,
      currentPage: pageNumber,
      prevPage: hasPrevPage ? pageNumber - 1 : null,
      nextPage: hasNextPage ? pageNumber + 1 : null,
      hasPrevPage,
      hasNextPage,
    },
  };
};

// Get Conversation Info
const getConversationInfo = async (
  currentUserId: string,
  conversationId: string,
) => {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
      OR: [{ creatorId: currentUserId }, { participantId: currentUserId }],
    },
    select: {
      creator: {
        select: {
          id: true,
          name: true,
          photo: true,
          email: true,
          bio: true,
        },
      },
      participant: {
        select: {
          id: true,
          name: true,
          photo: true,
          email: true,
          bio: true,
        },
      },
    },
  });
  if (!conversation) {
    throw new ApiError(404, "No conversation found with the provided id.");
  }

  const otherUser =
    conversation.creator.id === currentUserId
      ? conversation.participant
      : conversation.creator;

  return {
    participantName: otherUser.name,
    participantPhoto: otherUser.photo,
    participantEmail: otherUser.email,
    participantBio: otherUser.bio,
  };
};

// Get Conversation Star Messages
const getConversationStarMessages = async (
  currentUserId: string,
  conversationId: string,
  page?: number,
) => {
  const pageNumber = page || 1;
  const limit = 15;
  const skip = (pageNumber - 1) * limit;

  const where = {
    conversationId,
    markAsStar: true,
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
      sender: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const totalPages = Math.ceil(messagesCount / limit);
  const hasNextPage = totalPages > pageNumber;
  const hasPrevPage = pageNumber > 1;

  return {
    currentUserId,
    messages,
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

const conversationService = {
  createConversation,
  deleteConversation,
  getConversations,
  getConversationInfo,
  getConversationStarMessages,
};

export default conversationService;
