import { Request } from "express";

import { User } from "@prisma/client";

export interface IAuthRequest extends Request {
    user: User;
}