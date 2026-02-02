import {
  CheckCheck,
  FileText,
  ListFilter,
  Search,
  SquarePen,
  UserIcon,
  VolumeX,
} from "lucide-react";
import Link from "next/link";

const ChatList = () => {
  return (
    <aside
      id="chat-list-panel"
      className="absolute z-10 flex h-full w-full flex-col border-r border-[#e9edef] bg-white transition-transform duration-300 md:relative md:w-87.5 lg:w-100"
    >
      {/* Header */}
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

      {/* Search Bar */}
      <div className="px-3 pb-2">
        <div className="flex h-9 items-center rounded-lg bg-[#f0f2f5] px-3">
          <Search className="h-5 w-5 cursor-pointer text-[#54656f]" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="ml-4 w-full border-none bg-transparent text-sm outline-none placeholder-[#667781]"
          />
        </div>
      </div>

      {/* Filters */}
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

      {/* Chat List Items */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {/* Chat Item 1 (Active) */}
        <div
          /* onClick={() => selectChat(this, 'Abu Sayeed')} */
          className="group relative flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 bg-[#f0f2f5] px-3 py-3 hover:bg-[#f0f2f5]"
        >
          <img
            src="https://i.pravatar.cc/150?u=1"
            alt="User"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="truncate text-base font-medium text-[#111b21]">
                Abu Sayeed
              </h3>
              <span className="text-xs text-[#667781]">17:51</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 truncate text-sm text-[#667781]">
                <span>Hmm</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chat Item 2 */}
        <div
          /* onClick={() => selectChat(this, 'Boro Vaiya')} */
          className="flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 px-3 py-3 transition hover:bg-[#f0f2f5]"
        >
          <img
            src="https://i.pravatar.cc/150?u=2"
            alt="User"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="truncate text-base font-medium text-[#111b21]">
                Boro Vaiya
              </h3>
              <span className="text-xs text-[#667781]">22:18</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 truncate text-sm text-[#667781]">
                <CheckCheck className="h-4 w-4 text-blue-400" />
                <span>kortechi</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chat Item 3 */}
        <div
          /* onClick={() => selectChat(this, 'CSE-16')} */
          className="flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 px-3 py-3 transition hover:bg-[#f0f2f5]"
        >
          <img
            src="https://i.pravatar.cc/150?u=3"
            alt="Group"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="truncate text-base font-medium text-[#111b21]">
                CSE-16
              </h3>
              <span className="text-xs text-[#667781]">21:12</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="truncate text-sm text-[#667781]">
                +880 1895-252098 turned off advanced...
              </p>
              <VolumeX className="h-4 w-4 text-[#667781]" />
            </div>
          </div>
        </div>

        {/* Chat Item 4 */}
        <div
          /* onClick={() => selectChat(this, 'Cousin ❤️')} */
          className="flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 px-3 py-3 transition hover:bg-[#f0f2f5]"
        >
          <img
            src="https://i.pravatar.cc/150?u=4"
            alt="User"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="truncate text-base font-medium text-[#111b21]">
                Cousin ❤️
              </h3>
              <span className="text-xs text-[#667781]">Tuesday</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 truncate text-sm text-[#667781]">
                <FileText className="h-4 w-4 text-red-500" />
                <span>Tech Mart: iTech Smart LTD All RP...</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chat Item 5 */}
        <div
          /* onClick={() => selectChat(this, '+880 1518-739712')} */
          className="flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 px-3 py-3 transition hover:bg-[#f0f2f5]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-white">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="truncate text-base font-medium text-[#111b21]">
                +880 1518-739712
              </h3>
              <span className="text-xs text-[#667781]">Yesterday</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 truncate text-sm text-[#667781]">
                <CheckCheck className="h-4 w-4 text-[#54656f]" />
                <span>This ache</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chat Item 6 */}
        <div
          /* onClick={() => selectChat(this, 'Python Shikhe Web Dev')} */
          className="flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 px-3 py-3 transition hover:bg-[#f0f2f5]"
        >
          <img
            src="https://i.pravatar.cc/150?u=6"
            alt="User"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="truncate text-base font-medium text-[#111b21]">
                Python Shikhe Web Dev...
              </h3>
              <span className="text-xs text-[#667781]">22:27</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 truncate text-sm text-[#667781]">
                <span>+880 1752-183114 joined via invite link</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chat Item 7 (You) */}
        <div
          /* onClick={() => selectChat(this, '+880 1799-742945 (You)')} */
          className="flex cursor-pointer items-center gap-3 border-b border-[#e9edef]/50 px-3 py-3 transition hover:bg-[#f0f2f5]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-white">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="truncate text-base font-medium text-[#111b21]">
                +880 1799-742945 (You)
              </h3>
              <span className="text-xs text-[#667781]">Monday</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 truncate text-sm text-[#667781]">
                <CheckCheck className="h-4 w-4 text-blue-400" />
                <span>VMA@.3Ptu8PTT3X</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatList;
