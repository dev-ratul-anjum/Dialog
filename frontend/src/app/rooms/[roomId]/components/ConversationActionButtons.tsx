"use client";
import deleteConversation from "@/actions/deleteConversation";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";
import { Ban, ThumbsDown, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ConversationActionButtons = ({
  conversationId,
  participantName,
}: {
  conversationId: string;
  participantName: string;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const res = await deleteConversation(conversationId);

    if (res?.success) {
      toast.success("Conversation deleted!", {
        className:
          "bg-[#00875F] text-white rounded-md shadow-md px-4 py-2 text-sm",
        progressClassName: "bg-white/50",
      });
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });

      redirect(`/rooms`);
    } else {
      toast.error(res?.message, {
        className:
          "bg-[#C53030] text-white rounded-md shadow-md px-4 py-2 text-sm",
        progressClassName: "bg-white/50",
      });
      setIsDeleteModalOpen(false);
    }
  };
  return (
    <div className="mb-4 flex flex-col bg-white shadow-sm">
      <button className="flex items-center gap-4 px-4 py-3 font-medium text-red-500 hover:bg-gray-50 cursor-pointer">
        <Ban className="h-5 w-5" />
        <span>Block {participantName}</span>
      </button>
      <button className="flex items-center gap-4 border-t border-[#e9edef] px-4 py-3 font-medium text-red-500 hover:bg-gray-50 cursor-pointer">
        <ThumbsDown className="h-5 w-5" />
        <span>Report {participantName}</span>
      </button>

      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="flex items-center gap-4 border-t border-[#e9edef] px-4 py-3 font-medium text-red-500 hover:bg-gray-50 cursor-pointer"
      >
        <Trash2 className="h-5 w-5" />
        <span>Delete Chat</span>
      </button>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ConversationActionButtons;
