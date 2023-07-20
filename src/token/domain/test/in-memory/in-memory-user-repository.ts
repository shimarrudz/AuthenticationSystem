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
    
    async findUserById(userId: string): Promise<UserFromJwtDto | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
            },
        });

        return user ? { id: user.id, email: user.email } : null;
    }

    async findRefreshToken(token: string): Promise<RefreshToken | null> {
        const refreshToken = this.refreshTokens.find(
            (refreshToken) => refreshToken.token === token 
        );
        
        return refreshToken || null;
    }
    
}