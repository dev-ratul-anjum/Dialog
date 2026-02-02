import z from "zod";

export const createMessageSchema = z.object({
  text: z.string("Text is required.").trim().nonempty("Text cannot be empty."),
  receiverId: z
    .string("Receiver id is required.")
    .trim()
    .nonempty("Receiver id cannot be empty."),

  conversationId: z
    .string("Conversation id is required.")
    .trim()
    .nonempty("Conversation id cannot be empty."),
});

export type TCreateMessageSchema = z.infer<typeof createMessageSchema>;
