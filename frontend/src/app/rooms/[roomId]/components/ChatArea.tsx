"use client";

import {
  ArrowLeft,
  CheckCheck,
  Info,
  Phone,
  Search,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import ChatInput from "./ChatInput";

const ChatArea = ({
  children,
  conversationId,
}: {
  children: ReactNode;
  conversationId: string;
}) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  return (
    <>
      <main
        id="main-chat-area"
        className="relative z-0 flex h-full w-full flex-1 flex-col bg-[#efeae2] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10"
      >
        {/* Overlay for pattern contrast */}
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-[#efeae2]/90"></div>

        {/* Chat Header */}
        <header className="z-10 flex h-15 w-full items-center justify-between border-b border-[#e9edef] bg-[#f0f2f5] px-4 py-2">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => setShowContactInfo(true)}
          >
            {/* Back button for mobile */}
            <Link href="/rooms" className="mr-1 text-[#54656f] md:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <img
              src="https://i.pravatar.cc/150?u=1"
              alt="Current Chat"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-[#111b21]">
                Abu Sayeed
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

        {/* Messages Area - Semantic: <section> */}
        <section className="custom-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto p-4">
          {/* Date Divider */}
          <div className="my-2 flex justify-center">
            <span className="rounded-lg bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#667781] shadow-sm">
              Today
            </span>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="group relative max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Jay eid er porai</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:37</span>
              </div>
            </div>
          </div>

          {/* Message Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Agei utha Jay</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:37</span>
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Message Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Okay 👍</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:38</span>
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Fuad jodi eid pora dhakai ase tahole uthe jabo</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:39</span>
              </div>
            </div>
          </div>

          {/* Message Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Eid bolte romjan eid naki 👍</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:40</span>
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>
                Akhon to fuad basai gst exam porjonto basai thakbe . 10 e April
                or exam amra chaile may mashe utte pari
              </p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:41</span>
              </div>
            </div>
          </div>

          {/* Message Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Ktha bolte hbe or sathe</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:43</span>
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Ami kotha bolchilam bolche eid porjonto basai thakbe</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:44</span>
              </div>
            </div>
          </div>

          {/* Message Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Kurbani eid</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:44</span>
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Roja</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:44</span>
              </div>
            </div>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Eid</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:45</span>
              </div>
            </div>
          </div>

          {/* Message Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Erpor tahole utha jabe</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:52</span>
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Hmm</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:53</span>
              </div>
            </div>
          </div>

          {/* Message Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Ami je basai achi okane abar 1 mash agei janate hobe</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">16:58</span>
              </div>
            </div>
          </div>

          {/* Message Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Agei thik korte ki korbo na korbo</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">17:02</span>
                <CheckCheck className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Message Incoming (Last) */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-lg rounded-tl-none bg-[#ffffff] p-2 pl-3 pr-2 text-sm shadow-sm sm:max-w-[60%]">
              <p>Hmm</p>
              <div className="mt-1 flex select-none items-center justify-end gap-1">
                <span className="text-[10px] text-[#667781]">17:51</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Input Footer - Semantic: <footer> */}
        <ChatInput
          conversationId={conversationId}
          receiverId="ed02e189-2721-4062-8af6-e7e6294ada2b"
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
