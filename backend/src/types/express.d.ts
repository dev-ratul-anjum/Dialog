import { User } from "$/prisma/generated/client.ts";

declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, "name" | "email">;
    }
  }
}
