import ChatArea from "@/app/rooms/[roomId]/components/ChatArea";
import ContactInfo from "@/app/rooms/[roomId]/components/ContactInfo";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";

export const metadata = {
  title: "Dialog | Enjoy Chat Room",
  description:
    "Discover public rooms or communities that match your interests. Join and chat in real-time with Dialog.",
};

const RoomPage = ({ params }: { params: Promise<{ roomId: string }> }) => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <RoomContent params={params} />
      </Suspense>
    </>
  );
};

export default RoomPage;

const RoomContent = async ({ params }: RoomContentProps) => {
  const { roomId } = await params;

  return (
    <>
      {/* MAIN CHAT AREA */}
      <ChatArea conversationId={roomId}>
        {/* CONTACT INFO PANEL */}
        <ContactInfo conversationId={roomId} />
      </ChatArea>
    </>
  );
};

interface RoomContentProps {
  params: Promise<{ roomId: string }>;
}
