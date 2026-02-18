import { useQuery } from "@tanstack/react-query";

const fetchConversationInfo = async (conversationId: string) => {
  const res = await fetch(`/api/proxy/conversation/v1/info/${conversationId}`, {
    credentials: "include",
  });
  console.log("res : ", res);

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch conversation info");
  }
  console.log("data : ", data);
  return data;
};

const useConversationInfo = (conversationId: string) => {
  console.log("conversationId : ", conversationId);
  return useQuery({
    queryKey: ["conversation-info", conversationId],
    queryFn: async () => await fetchConversationInfo(conversationId),
    enabled: !!conversationId,
  });
};

export default useConversationInfo;
