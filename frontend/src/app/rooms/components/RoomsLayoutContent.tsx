"use client";

import { useParams } from "next/navigation";
import { ReactNode } from "react";
import ChatList from "./ChatList";

const RoomsLayoutContent = ({
  navigationRail,
  children,
}: {
  navigationRail: ReactNode;
  children: ReactNode;
}) => {
  const params = useParams<{ roomId?: string }>();
  const isRoomPage = !!params?.roomId; // true if /rooms/[id]

  return (
    <>
      {/* NAVIGATION RAIL */}
      {navigationRail}

      {/* CHAT LIST PANEL */}
      <aside
        id="chat-list-panel"
        // className="absolute z-10 flex h-full w-full flex-col border-r border-[#e9edef] bg-white transition-transform duration-300 md:relative md:w-87.5 lg:w-100"
        className={`absolute z-10 flex h-full w-full flex-col border-r border-[#e9edef] bg-white transition-transform duration-300 md:relative md:w-87.5 lg:w-100 ${isRoomPage ? "hidden md:flex" : "flex"}`}
      >
        <ChatList />
      </aside>

      {children}
    </>
  );
};

export default RoomsLayoutContent;
