import { CircleDashed, MessageSquareText, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NavigationRail = () => {
  return (
    <nav className="hidden w-15 flex-col items-center justify-between border-r border-[#e9edef] bg-[#f0f2f5] py-3 z-20 md:flex">
      <div className="flex w-full flex-col items-center gap-4">
        {/* Top Icons */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <Link prefetch={false} href="/rooms">
            <MessageSquareText className="h-6 w-6" />
          </Link>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <Link prefetch={false} href="/calls">
            <Users className="h-6 w-6" />
          </Link>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <Link prefetch={false} href="/status">
            <CircleDashed className="h-6 w-6" />
          </Link>
        </button>
      </div>

      <div className="mb-2 flex w-full flex-col items-center gap-4">
        {/* Bottom Icons */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] transition hover:bg-gray-200">
          <Link prefetch={false} href="/settings">
            <Settings className="h-6 w-6" />
          </Link>
        </button>
        <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full">
          <Link prefetch={false} href="/profile">
            <Image
              src="https://i.pravatar.cc/150?u=me"
              alt="My Profile"
              className="h-full w-full object-cover"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationRail;
