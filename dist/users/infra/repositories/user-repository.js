"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
class UserRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(data) {
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        await this.prisma.user.create({
            data: {
                ...data,
                password_hash: passwordHash,
                created_at: new Date(),
            },
        });
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? { ...user, password: user.password_hash, createdAt: user.created_at } : null;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user-repository.js.map