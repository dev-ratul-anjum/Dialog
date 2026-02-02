import { CircleDashed, MessageSquareText, Settings, Users } from "lucide-react";

const NavigationRail = () => {
  return (
    <nav className="hidden w-[60px] flex-col items-center justify-between border-r border-[#e9edef] bg-[#f0f2f5] py-3 z-20 md:flex">
      <div className="flex w-full flex-col items-center gap-4">
        {/* Top Icons */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <MessageSquareText className="h-6 w-6" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <Users className="h-6 w-6" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <CircleDashed className="h-6 w-6" />
        </button>
      </div>

      <div className="mb-2 flex w-full flex-col items-center gap-4">
        {/* Bottom Icons */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <Settings className="h-6 w-6" />
        </button>
        <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full">
          <img
            src="https://i.pravatar.cc/150?u=me"
            alt="My Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationRail;
