import { getDecodedCookies } from "@/lib/cookies";
import {
  Bell,
  ChevronRight,
  History,
  Lock,
  Phone,
  Search,
  Star,
  UserIcon,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import ConversationActions from "./ConversationActions";
import { notFound } from "next/navigation";

const ContactInfo = async ({ conversationId }: { conversationId: string }) => {
  const cookieHeader = await getDecodedCookies(); // Decode for signed cookie
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation/v1/info/${conversationId}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  const info = await res.json();

  if (info.success === false) {
    notFound();
  }

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto bg-[#d1d7db]">
      {/* Profile Section */}
      <div className="mb-2 flex flex-col items-center bg-white p-6 shadow-sm">
        {info.data.participantPhoto ? (
          <Image
            src={info.data.participantPhoto}
            alt="Profile"
            className="mb-4 rounded-full object-cover"
            height={150}
            width={150}
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300 text-white mb-4">
            <UserIcon className="h-10 w-10" />
          </div>
        )}
        <h2 className="text-xl font-medium text-[#111b21]">
          {info.data.participantName}
        </h2>
        <p className="mt-1 text-base text-[#667781]">
          {info.data.participantEmail}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex w-full justify-center gap-4">
          <div className="group flex flex-col items-center gap-1 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e9edef] text-[#00a884] shadow-sm group-hover:bg-gray-50">
              <Phone className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-[#00a884]">Audio</span>
          </div>
          <div className="group flex flex-col items-center gap-1 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e9edef] text-[#00a884] shadow-sm group-hover:bg-gray-50">
              <Video className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-[#00a884]">Video</span>
          </div>
          <div className="group flex flex-col items-center gap-1 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e9edef] text-[#00a884] shadow-sm group-hover:bg-gray-50">
              <Search className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-[#00a884]">Search</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-2 bg-white p-4 shadow-sm">
        <p className="mb-1 text-sm text-[#667781]">About</p>
        <p className="text-base text-[#111b21]">
          Hey there! I am using Dialog.
        </p>
      </div>

      {/* Media Section */}
      <div className="mb-2 flex cursor-pointer justify-between items-center bg-white p-4 shadow-sm hover:bg-gray-50">
        <p className="text-sm font-medium text-[#667781]">
          Media, links and docs
        </p>
        <div className="flex items-center gap-1 text-[#667781]">
          <span className="text-xs">3</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      {/* Options List */}
      <div className="mb-2 bg-white shadow-sm">
        <div className="flex cursor-pointer items-center gap-4 p-4 hover:bg-gray-50">
          <Star className="h-5 w-5 text-[#54656f]" />
          <p className="flex-1 text-base text-[#111b21]">Starred messages</p>
          <ChevronRight className="h-4 w-4 text-[#667781]" />
        </div>
        <div className="flex cursor-pointer items-center gap-4 border-t border-[#e9edef] p-4 hover:bg-gray-50">
          <Bell className="h-5 w-5 text-[#54656f]" />
          <p className="flex-1 text-base text-[#111b21]">
            Notification settings
          </p>
          <ChevronRight className="h-4 w-4 text-[#667781]" />
        </div>
        <div className="flex cursor-pointer items-center gap-4 border-t border-[#e9edef] p-4 hover:bg-gray-50">
          <Lock className="h-5 w-5 text-[#54656f]" />
          <div className="flex-1">
            <p className="text-base text-[#111b21]">Encryption</p>
            <p className="text-xs text-[#667781]">
              Messages are end-to-end encrypted.
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-[#667781]" />
        </div>
        <div className="flex cursor-pointer items-center gap-4 border-t border-[#e9edef] p-4 hover:bg-gray-50">
          <History className="h-5 w-5 text-[#54656f]" />
          <div className="flex-1">
            <p className="text-base text-[#111b21]">Disappearing messages</p>
            <p className="text-xs text-[#667781]">Off</p>
          </div>
          <ChevronRight className="h-4 w-4 text-[#667781]" />
        </div>
      </div>

      {/* Groups Common */}
      <div className="mb-8 bg-white shadow-sm">
        <p className="px-4 pb-2 pt-4 text-sm text-[#667781]">
          3 groups in common
        </p>

        <div className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-[#54656f]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base text-[#111b21]">@Abu@Ratul@Fuad</p>
            <p className="text-xs text-[#667781]">Abu, +880 1540..., You</p>
          </div>
        </div>
      </div>

      {/* Block/Report/Delete */}
      <ConversationActions
        conversationId={conversationId}
        participantName={info.data.participantName}
      />
    </div>
  );
};

export default ContactInfo;
