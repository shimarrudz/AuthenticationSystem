import { User } from "@prisma/client";
import { Request } from "express";

export interface IAuthRequest extends Request {
  user: User;
}
