import { ArrowLeft, MessageCircle, UserIcon } from "lucide-react";
import Link from "next/link";

const NewChatForm = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header for context (optional but good for UX) */}
      <div className="flex h-15 items-center gap-3 bg-[#008069] px-4 text-white">
        <Link prefetch={false} href="/rooms">
          <ArrowLeft className="h-5 w-5 cursor-pointer" />
        </Link>
        <span className="text-lg font-medium">New chat</span>
      </div>

      <div className="flex flex-col p-4 gap-4">
        {/* 1. Single Input Box */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#008069] ml-1">
            Phone Number or Name
          </label>
          <input
            type="text"
            //   defaultValue={SELECTED_USER_IN_ADD_CHAT} // Simulating selected user value appearing here
            placeholder="Type contact name"
            className="w-full border-b-2 border-[#008069] py-1 text-base outline-none focus:border-[#008069]"
          />
        </div>

        {/* 2. Add Button */}
        <button className="w-full rounded-md bg-[#008069] py-2 text-sm font-medium text-white shadow-sm hover:bg-[#006d59] transition">
          ADD CHAT
        </button>
      </div>

      {/* 3. List of filtered users */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-4 py-2 text-xs font-medium text-[#008069] uppercase tracking-wide">
          Contacts on WhatsApp
        </div>

        {/* User Row: Existing Chat (Shows View Chat button) */}
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f6f6] cursor-pointer group border-b border-[#e9edef]/50">
          <img
            src="https://i.pravatar.cc/150?u=user_existing"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-base text-[#111b21]">Boro Vaiya</span>
              <span className="text-xs text-[#667781]">~Existing Chat</span>
            </div>
            {/* UI Behavior: Existing chat -> View Chat button */}
            <button className="flex items-center gap-1 rounded-full bg-[#e9edef] px-3 py-1 text-xs font-medium text-[#008069] hover:bg-[#d1d7db]">
              <MessageCircle className="h-3 w-3" />
              View Chat
            </button>
          </div>
        </div>

        {/* User Row: Selected (Value appears in input) */}
        {/* Visually indicating selection with a background color */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#e9edef] cursor-pointer border-b border-[#e9edef]/50">
          <img
            src="https://i.pravatar.cc/150?u=user_selected"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              <span className="text-base text-[#111b21] font-medium">
                {/* {SELECTED_USER_IN_ADD_CHAT} */}
              </span>
              <span className="text-xs text-[#667781]">~Selected</span>
            </div>
          </div>
        </div>

        {/* User Row: Standard */}
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f6f6] cursor-pointer border-b border-[#e9edef]/50">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              <span className="text-base text-[#111b21]">+880 1632-203182</span>
              <span className="text-xs text-[#667781]">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatForm;
