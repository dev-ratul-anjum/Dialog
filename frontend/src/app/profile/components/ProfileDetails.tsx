import { ArrowLeft, ImageIcon, Pencil, UserIcon } from "lucide-react";

const ProfileDetails = () => {
  return (
    <div className="flex flex-col h-full animate-in slide-in-from-left duration-200">
      <header className="flex h-27 items-end bg-white px-6 pb-4">
        <div className="flex items-center gap-6">
          <ArrowLeft className="h-6 w-6 text-[#54656f] cursor-pointer" />
          <h1 className="text-xl font-medium text-[#111b21]">Profile</h1>
        </div>
      </header>
      <div className="flex-1 bg-[#f0f2f5] overflow-y-auto custom-scrollbar">
        <div className="flex flex-col items-center py-7 bg-white">
          <div className="relative group cursor-pointer">
            <div className="h-50 w-50 rounded-full overflow-hidden bg-[#dfe5e7] flex items-center justify-center">
              <UserIcon className="h-20 w-20 text-white" />
            </div>
            <div className="absolute inset-0 bg-black/30 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ImageIcon className="h-6 w-6 mb-2" />
              <span className="text-xs uppercase text-center px-4">
                Change profile picture
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white px-8 py-4 mb-3">
          <p className="text-[#008069] text-sm mb-4">Your name</p>
          <div className="flex justify-between items-center border-b border-transparent hover:border-[#d1d7db] pb-2">
            <span className="text-base text-[#111b21]">Ratul Anjum</span>
            <Pencil className="h-5 w-5 text-[#54656f]" />
          </div>
        </div>
        <div className="bg-white px-8 py-4 mb-3">
          <p className="text-[#667781] text-sm mb-4">About</p>
          <div className="flex justify-between items-center">
            <span className="text-base text-[#111b21]">
              Hey there! I am using WhatsApp.
            </span>
            <Pencil className="h-5 w-5 text-[#54656f]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
