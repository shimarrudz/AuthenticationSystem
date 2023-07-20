import { UserFromJwtDto } from "@/auth/domain/dto";
import { IRefreshTokenRepository } from "../../interfaces";
import { PrismaClient, RefreshToken } from "@prisma/client";

export class InMemoryRefreshToken implements IRefreshTokenRepository {
    private prisma: PrismaClient;
    private refreshTokens: RefreshToken[];

    constructor() {
        this.prisma = new PrismaClient();
        this.refreshTokens = [];
    }
    
}