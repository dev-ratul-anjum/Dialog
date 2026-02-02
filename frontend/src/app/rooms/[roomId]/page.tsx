import ChatArea from "@/app/rooms/components/ChatArea";
import ContactInfo from "@/app/rooms/components/ContactInfo";

const RoomPage = () => {
  return (
    <>
      {/* MAIN CHAT AREA */}
      <ChatArea />

      {/* CONTACT INFO PANEL */}
      <ContactInfo />
    </>
  );
};

export default RoomPage;
