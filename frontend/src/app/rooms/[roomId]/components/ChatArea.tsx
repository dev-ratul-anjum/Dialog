"use client";

import {
  ArrowLeft,
  Info,
  Phone,
  Search,
  UserIcon,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Message from "./Message";
import ChatHeaderSkeleton from "./ChatHeaderSkeleton";
import MessageAreaSkeleton from "./MessageAreaSkeleton";
import ChatLoadingSpinner from "./ChatLoadingSpinner";

const ChatArea = ({
  children,
  conversationId,
}: {
  children: ReactNode;
  conversationId: string;
}) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const loaderRef = useRef(null);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["conversation-messages", conversationId],
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `/api/proxy/message/v1/get/${conversationId}?page=${pageParam}`,
          {
            credentials: "include",
          },
        );
        return res.json();
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.data?.meta.hasNextPage) return undefined;
        return lastPage?.data?.meta.nextPage;
      },
      getPreviousPageParam: (firstPage) => {
        if (!firstPage?.data?.meta.hasPreviousPage) return undefined;
        return firstPage?.data?.meta.prevPage;
      },
      gcTime: 10 * 60_000,
    });

  const conversationParticipantId = data?.pages[0].data.participantId;

  useEffect(() => {
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      <main
        id="main-chat-area"
        className="relative z-0 flex h-full w-full flex-1 flex-col bg-[#efeae2] bg-linear-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e5e7eb]"
      >
        {/* Overlay for pattern contrast */}
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-[#efeae2]/90"></div>

        {/* Chat Header */}
        {isLoading ? (
          <ChatHeaderSkeleton />
        ) : (
          <header className="z-10 flex h-15 w-full items-center justify-between border-b border-[#e9edef] bg-[#f0f2f5] px-4 py-2">
            <div
              className="flex cursor-pointer items-center gap-3"
              onClick={() => setShowContactInfo(true)}
            >
              {/* Back button for mobile */}
              <Link href="/rooms" className="mr-1 text-[#54656f] md:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Link>

              {data?.pages[0].data.participantPhoto ? (
                <Image
                  src={data?.pages[0].data.participantPhoto}
                  alt="Current Chat"
                  className="h-10 w-10 rounded-full object-cover"
                  height={40}
                  width={40}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white">
                  <UserIcon className="h-6 w-6" />
                </div>
              )}

              <div className="flex flex-col">
                <h2 className="text-base font-medium text-[#111b21]">
                  {data?.pages[0].data.participantName}
                </h2>
                {/* <p className="text-xs text-[#667781]">
                click here for contact info
              </p> */}
              </div>
            </div>
            <div className="flex items-center gap-5 text-[#54656f]">
              <button>
                <Phone className="h-4 w-4" />
              </button>

              <button>
                <Video className="h-5 w-5" />
              </button>
              <button>
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowContactInfo(!showContactInfo)}
                className="cursor-pointer"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
          </header>
        )}

        {/* Messages Area - Semantic: <section> */}
        {isLoading ? (
          <MessageAreaSkeleton />
        ) : (
          <section className="custom-scrollbar flex flex-1 flex-col-reverse gap-2 overflow-y-auto p-4">
            {data?.pages.flatMap((page) =>
              page?.data.messages.map((msg: MessageItem) => (
                <Message
                  key={msg.id}
                  item={msg}
                  conversationParticipantId={conversationParticipantId}
                />
              )),
            )}

            {hasNextPage && <ChatLoadingSpinner ref={loaderRef} />}
          </section>
        )}

        {/* Chat Input Footer - Semantic: <footer> */}
        <ChatInput
          conversationId={conversationId}
          receiverId={conversationParticipantId}
        />
      </main>

      {showContactInfo && (
        <aside
          id="contact-info-panel"
          className="relative z-20 hidden h-full w-87.5 flex-col border-l border-[#e9edef] bg-white transition-transform duration-300 lg:flex lg:translate-x-0 lg:w-100"
        >
          {/* Header */}
          <header className="flex h-15 items-center gap-4 border-b border-[#e9edef] bg-[#f0f2f5] px-4">
            <button
              onClick={() => setShowContactInfo(false)}
              className="text-[#54656f] lg:hidden cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowContactInfo(false)}
              className="hidden text-[#54656f] lg:block cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-base font-medium">Contact info</h2>
          </header>

          {children}
        </aside>
      )}
    </>
  );
};

export default ChatArea;

interface MessageItem {
  id: string;
  text: string | null;
  attachments: string[];
  updatedAt: string;
  senderId: string;
}
