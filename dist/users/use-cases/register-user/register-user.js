"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
let RegisterUserUseCase = exports.RegisterUserUseCase = class RegisterUserUseCase {
    async execute(data) {
        const { name, email, password } = data;
        const prisma = new client_1.PrismaClient();
        const password_hash = await bcrypt_1.default.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password_hash,
            },
        });
        await prisma.$disconnect();
    }
};
exports.RegisterUserUseCase = RegisterUserUseCase = __decorate([
    (0, common_1.Injectable)()
], RegisterUserUseCase);
//# sourceMappingURL=register-user.js.map