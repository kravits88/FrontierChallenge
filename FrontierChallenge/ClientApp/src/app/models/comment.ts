import { User } from "./user";

export interface Comment {
  id?: number;
  content?: string;
  createdAt?: Date;
  score?: number;
  user?: User;
  replies?: Array<Comment>;
  replyingTo?: string;
  replyingToId?: number;
}
