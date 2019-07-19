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
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../../../repositories");
const auth_user_model_1 = require("../models/auth-user.model");
const models_1 = require("../../../models");
let LocalPasswordVerifyProvider = class LocalPasswordVerifyProvider {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    value() {
        return async (username, password) => {
            const user = new auth_user_model_1.AuthUser(await this.userRepository.verifyPassword(username, password));
            user.permissions = [];
            user.tenant = new models_1.Tenant({ id: user.defaultTenant });
            return user;
        };
    }
};
LocalPasswordVerifyProvider = __decorate([
    __param(0, repository_1.repository(repositories_1.UserRepository)),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], LocalPasswordVerifyProvider);
exports.LocalPasswordVerifyProvider = LocalPasswordVerifyProvider;
//# sourceMappingURL=local-password-verify.provider.js.map