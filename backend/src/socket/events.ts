import { Server, Socket } from "socket.io";

const registerSocketEvents = (io: Server, socket: Socket) => {
  socket.on("join-room", (conversationId: string) => {
    socket.join(conversationId);
  });

  socket.on("leave-room", (conversationId: string) => {
    socket.leave(conversationId);
  });

  socket.on(
    "add-message",
    (payload: { conversationId: string; newMessage: MessageItem }) => {
      const { conversationId, newMessage } = payload;
      io.to(conversationId).emit("new-message", newMessage);
    },
  );
};

export default registerSocketEvents;

interface MessageItem {
  id: string;
  text: string | null;
  attachments: string[];
  updatedAt: string;
  senderId: string;
}
