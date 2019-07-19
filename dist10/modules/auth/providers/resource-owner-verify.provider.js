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
const rest_1 = require("@loopback/rest");
let ResourceOwnerVerifyProvider = class ResourceOwnerVerifyProvider {
    constructor(userRepository, authClientRepository) {
        this.userRepository = userRepository;
        this.authClientRepository = authClientRepository;
    }
    value() {
        return async (clientId, clientSecret, username, password) => {
            const user = await this.userRepository.verifyPassword(username, password);
            if (!user) {
                throw new rest_1.HttpErrors.Unauthorized("Invalid redentials" /* InvalidCredentials */);
            }
            const client = await this.authClientRepository.findOne({
                where: {
                    clientId,
                },
            });
            if (!client || client.userIds.indexOf(user.id || 0) < 0) {
                throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
            }
            else if (!client.clientSecret || client.clientSecret !== clientSecret) {
                throw new rest_1.HttpErrors.Unauthorized("Client Verification Failed" /* ClientVerificationFailed */);
            }
            return {
                client,
                user,
            };
        };
    }
};
ResourceOwnerVerifyProvider = __decorate([
    __param(0, repository_1.repository(repositories_1.UserRepository)),
    __param(1, repository_1.repository(repositories_1.AuthClientRepository)),
    __metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.AuthClientRepository])
], ResourceOwnerVerifyProvider);
exports.ResourceOwnerVerifyProvider = ResourceOwnerVerifyProvider;
//# sourceMappingURL=resource-owner-verify.provider.js.map