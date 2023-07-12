"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    constructor(userRepository) {
        this.users = [];
        this.userRepository = userRepository;
    }
    async create(data) {
        this.users.push(data);
        await this.userRepository.create(data);
    }
    async findByEmail(email) {
        const user = this.users.find((u) => u.email === email);
        return user || null;
    }
    async findAll() {
        return this.users;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=in-memory-users-repository.js.map