"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const register_user_1 = require("./use-cases/register-user/register-user");
const users_controller_1 = require("../shared/infra/http/users-controller/users-controller");
const prisma_user_repository_1 = require("./infra/repositories/prisma/prisma-user-repository");
const get_user_1 = require("./use-cases/get-user/get-user");
const soft_delete_1 = require("./use-cases/soft-delete/soft-delete");
const prisma_1 = require("../auth/infra/repositories/prisma");
let UsersModule = exports.UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [register_user_1.RegisterUserUseCase, prisma_user_repository_1.UserRepository, get_user_1.GetUserUseCase, soft_delete_1.SoftDeleteUserUseCase, prisma_1.RevokedTokenRepository],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map