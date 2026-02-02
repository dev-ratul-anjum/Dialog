import { prisma } from "$/prisma/prisma.js";
import { TCreateConversationSchema } from "./conversation.schema.js";

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

const conversationService = {
  createConversation,
  deleteConversation,
};

export default conversationService;
