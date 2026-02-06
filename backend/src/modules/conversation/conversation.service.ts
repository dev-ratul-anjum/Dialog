import { prisma } from "$/prisma/prisma.js";
import { TCreateConversationSchema } from "./conversation.schema.js";
import { Prisma } from "$/prisma/generated/client.js";

const createConversation = async (
  data: TCreateConversationSchema,
  creatorId: string,
) => {
  await prisma.conversation.create({
    data: {
      creatorId,
      participantId: data.participantId,
    },
  });
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
    },
  });

  const formattedConversations = await Promise.all(
    conversations.map(async (conv) => {
      const message = await prisma.message.findFirst({
        where: { conversationId: conv.id },
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          text: true,
          updatedAt: true,
        },
      });

      const isCreator = conv.creator.id === currentUserId;
      const otherUser = isCreator ? conv.participant : conv.creator;

      return {
        id: conv.id,
        participantName: otherUser.name,
        participantPhoto: otherUser.photo,
        lastMessage: message?.text ?? null,
        lastMessageAt: message?.updatedAt ?? null,
      };
    }),
  );

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

const conversationService = {
  createConversation,
  deleteConversation,
  getConversations,
};

export default conversationService;
