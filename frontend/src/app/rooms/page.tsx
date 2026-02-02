import ChatArea from "@/components/rooms/ChatArea";
import ChatList from "@/components/rooms/ChatList";
import ContactInfo from "@/components/rooms/ContactInfo";
import NavigationRail from "@/components/rooms/NavigationRail";

const RoomsPage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#d1d7db] font-sans text-[#111b21] relative">
      {/* 1. NAVIGATION RAIL (Leftmost) */}
      <NavigationRail />

      {/* 2. CHAT LIST PANEL */}
      <ChatList />

      {/* 3. MAIN CHAT AREA */}
      <ChatArea />

      {/* 4. CONTACT INFO PANEL */}
      <ContactInfo />
    </div>
  );
};

export default RoomsPage;
