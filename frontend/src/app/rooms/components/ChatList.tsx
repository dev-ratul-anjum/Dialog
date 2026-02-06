"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  CheckCheck,
  FileText,
  ListFilter,
  Search,
  SquarePen,
  UserIcon,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { List, RowComponentProps } from "react-window";
import SearchSkeleton from "./SearchSkeleton";
import ChatRowSkeleton from "./ChatRowSkeleton";
import HeaderSkeleton from "./HeaderSkeleton";
import FiltersSkeleton from "./FiltersSkeleton";
import useDebounce from "@/hooks/useDebounce";
import NoConversationSkeleton from "./NoConversationSkeleton";

const ChatList = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const debouncedSearchChange = useDebounce((value: string) => {
    setDebouncedSearch(value);
  }, 400);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["conversations", debouncedSearch],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `/api/proxy/conversation/v1/all?page=${pageParam}&query=${debouncedSearch}`, // Proxy path
        {
          credentials: "include", // Still needed for proxy to get cookies
        },
      );
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.meta.hasNextPage) return undefined;
      return lastPage.data.meta.nextPage;
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage.data.meta.hasPrevPage) return undefined;
      return firstPage.data.meta.prevPage;
    },
  });

  const items = data?.pages.flatMap((page) => page.data.conversations) || [];
  const totalRow = data?.pages[0].data.meta.totalConversations || 0;
  const isInitialLoading = !data;

  const onRowsRender = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => {
    if (stopIndex >= items.length && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    if (startIndex <= 10 && hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  };

  const conversation = ({ index, style }: RowComponentProps) => {
    const isSelected = items[index].id === selectedChatId;
    return (
      <Link
        href={`/rooms/${items[index].id}`}
        style={style}
        onClick={() => setSelectedChatId(items[index].id)}
        className={`flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 px-3 py-3 hover:bg-[#f0f2f5] transition ${isSelected && "bg-[#f0f2f5] group relative"}`}
      >
        {items[index].participantPhoto ? (
          <Image
            src={items[index].participantPhoto}
            alt="User"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-white">
            <UserIcon className="h-6 w-6" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between">
            <h3 className="truncate text-base font-medium text-[#111b21]">
              {items[index].participantName}
            </h3>
            <span className="text-xs text-[#667781]">
              {items[index].lastMessageAt}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1 truncate text-sm text-[#667781]">
              {items[index].attachments && (
                <FileText className="h-4 w-4 text-red-500" />
              )}
              <span>
                {items[index].lastMessage && items[index].lastMessage}
              </span>
            </p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <aside
      id="chat-list-panel"
      className="absolute z-10 flex h-full w-full flex-col border-r border-[#e9edef] bg-white transition-transform duration-300 md:relative md:w-87.5 lg:w-100"
    >
      {/* Header */}
      {isInitialLoading ? (
        <HeaderSkeleton />
      ) : (
        <header className="flex h-15 items-center justify-between bg-white px-4 py-2">
          <h1 className="text-2xl font-bold tracking-tight">Chats</h1>
          <div className="flex gap-3 text-[#54656f]">
            <button>
              <Link prefetch={false} href="/add-chat">
                <SquarePen className="h-5 w-5" />
              </Link>
            </button>
            <button>
              <ListFilter className="h-5 w-5" />
            </button>
          </div>
        </header>
      )}

      {/* Search Bar */}
      {isInitialLoading ? (
        <SearchSkeleton />
      ) : (
        <div className="px-3 pb-2">
          <div className="flex h-9 items-center rounded-lg bg-[#f0f2f5] px-3">
            <Search className="h-5 w-5 cursor-pointer text-[#54656f]" />
            <input
              type="text"
              placeholder="Search or start a new chat"
              value={query}
              onChange={(e) => {
                const text = e.target.value;
                setQuery(text);
                debouncedSearchChange(text);
              }}
              className="ml-4 w-full border-none bg-transparent text-sm outline-none placeholder-[#667781]"
            />
          </div>
        </div>
      )}

      {/* Filters */}
      {isInitialLoading ? (
        <FiltersSkeleton />
      ) : (
        <div className="scrollbar-hide flex gap-2 overflow-x-auto px-3 py-2">
          <button className="whitespace-nowrap rounded-full bg-[#00a884]/10 px-3 py-1 text-xs font-medium text-[#00a884]">
            All
          </button>
          <button className="whitespace-nowrap rounded-full bg-[#f0f2f5] px-3 py-1 text-xs font-medium text-[#667781] hover:bg-gray-200">
            Unread
          </button>
          <button className="whitespace-nowrap rounded-full bg-[#f0f2f5] px-3 py-1 text-xs font-medium text-[#667781] hover:bg-gray-200">
            Favourites
          </button>
          <button className="whitespace-nowrap rounded-full bg-[#f0f2f5] px-3 py-1 text-xs font-medium text-[#667781] hover:bg-gray-200">
            Groups
          </button>
        </div>
      )}

      {/* Chat List Items */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {isInitialLoading ? (
          Array.from({ length: 8 }).map((_, i) => <ChatRowSkeleton key={i} />)
        ) : (
          <>
            <List
              rowComponent={conversation}
              rowCount={totalRow}
              rowHeight={73}
              rowProps={{}}
              onRowsRendered={onRowsRender}
              overscanCount={10}
            />

            {isFetchingNextPage && (
              <>
                <ChatRowSkeleton />
                <ChatRowSkeleton />
              </>
            )}
          </>
        )}

        {items.length === 0 && !isInitialLoading && <NoConversationSkeleton />}
      </div>
    </aside>
  );
};

export default ChatList;
