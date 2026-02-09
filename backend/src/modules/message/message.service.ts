import { prisma } from "$/prisma/prisma.js";
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

const messageService = {
  createMessage,
  deleteMessage,
};

export default messageService;
