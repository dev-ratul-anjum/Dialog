import ChatArea from "@/app/rooms/[roomId]/components/ChatArea";
import ContactInfo from "@/app/rooms/[roomId]/components/ContactInfo";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";

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
        <ContactInfo />
      </ChatArea>
    </>
  );
};

interface RoomContentProps {
  params: Promise<{ roomId: string }>;
}
