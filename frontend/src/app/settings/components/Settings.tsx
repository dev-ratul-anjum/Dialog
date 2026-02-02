import {
  Bell,
  HelpCircle,
  Keyboard,
  Lock,
  LogOut,
  MessageCircle,
  Monitor,
  Search,
  ShieldCheck,
  UserIcon,
  Video,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] animate-in slide-in-from-left duration-200">
      <header className="flex h-15 items-center px-4 bg-white border-b border-[#d1d7db]">
        <h1 className="text-xl font-bold">Settings</h1>
      </header>
      <div className="p-3 bg-white">
        <div className="flex h-9 items-center rounded-lg bg-[#f0f2f5] px-3 focus-within:ring-1 ring-[#00a884]">
          <Search className="h-5 w-5 text-[#54656f]" />
          <input
            type="text"
            placeholder="Search settings"
            className="ml-4 w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div className="flex items-center gap-4 px-4 py-3 hover:bg-[#f5f6f6] cursor-pointer">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
            <UserIcon className="h-12 w-12 text-[#919191]" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Ratul Anjum</p>
            <p className="text-sm text-[#667781]">
              Hey there! I am using WhatsApp.
            </p>
          </div>
        </div>
        {[
          { icon: Monitor, label: "General", sub: "Startup and close" },
          {
            icon: ShieldCheck,
            label: "Account",
            sub: "Security notifications, account info",
          },
          {
            icon: Lock,
            label: "Privacy",
            sub: "Blocked contacts, disappearing messages",
          },
          {
            icon: MessageCircle,
            label: "Chats",
            sub: "Theme, wallpaper, chat settings",
          },
          {
            icon: Video,
            label: "Video & voice",
            sub: "Camera, microphone & speakers",
          },
          {
            icon: Bell,
            label: "Notifications",
            sub: "Message notifications",
          },
          {
            icon: Keyboard,
            label: "Keyboard shortcuts",
            sub: "Quick actions",
          },
          {
            icon: HelpCircle,
            label: "Help and feedback",
            sub: "Help centre, contact us",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 px-6 py-3 hover:bg-[#f5f6f6] cursor-pointer"
          >
            <item.icon className="h-5 w-5 text-[#54656f]" />
            <div className="border-b border-[#e9edef] flex-1 pb-3">
              <p className="text-base">{item.label}</p>
              <p className="text-xs text-[#667781]">{item.sub}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-5 px-6 py-4 text-red-500 hover:bg-[#f5f6f6] cursor-pointer">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
