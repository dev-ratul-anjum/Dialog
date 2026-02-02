import ChatList from "@/app/rooms/components/ChatList";
import NavigationRail from "@/app/rooms/components/NavigationRail";
import { ReactNode } from "react";

const RoomsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#d1d7db] text-[#111b21] relative">
      {/* NAVIGATION RAIL */}
      <NavigationRail />

      {/* CHAT LIST PANEL */}
      <ChatList />

      {children}
    </div>
  );
};

export default RoomsLayout;
