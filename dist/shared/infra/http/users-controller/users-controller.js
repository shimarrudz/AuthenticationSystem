"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const get_user_1 = require("../../../../users/use-cases/get-user/get-user");
const create_user_dto_1 = require("../../../../users/dto/create-user.dto");
const register_user_1 = require("../../../../users/use-cases/register-user/register-user");
const soft_delete_1 = require("../../../../users/use-cases/soft-delete/soft-delete");
const guards_1 = require("../../../../auth/guards");
let UsersController = exports.UsersController = class UsersController {
    constructor(registerUserUseCase, getUserUseCase, softDeleteUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.softDeleteUseCase = softDeleteUseCase;
    }
    async create(createUserDto) {
        const user = {
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            password_hash: '',
            createdAt: new Date(),
        };
        try {
            await this.registerUserUseCase.execute(user);
            return { message: 'User created successfully' };
        }
        catch (error) {
            throw error;
        }
    }
    async getUser(user_id) {
        return this.getUserUseCase.execute(user_id);
    }
    async deleteUser(user_id) {
        await this.softDeleteUseCase.execute(user_id);
        return { message: 'User soft deleted successfully' };
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [register_user_1.RegisterUserUseCase,
        get_user_1.GetUserUseCase,
        soft_delete_1.SoftDeleteUserUseCase])
], UsersController);
//# sourceMappingURL=users-controller.js.map