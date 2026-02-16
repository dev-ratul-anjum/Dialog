import NavigationRail from "@/app/rooms/components/NavigationRail";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ReactNode, Suspense } from "react";
import ChatList from "./components/ChatList";

const RoomsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-[#111b21] relative">
      {/* NAVIGATION RAIL */}
      <NavigationRail />

      {/* CHAT LIST PANEL */}
      <Suspense fallback={<LoadingSpinner />}>
        <ChatList />
      </Suspense>

      <div className="flex-1 min-w-0"> {children}</div>
    </div>
  );
};

export default RoomsLayout;
