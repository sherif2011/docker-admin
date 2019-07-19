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
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
const repositories_1 = require("../../../repositories");
let BearerTokenVerifyProvider = class BearerTokenVerifyProvider {
    constructor(revokedTokenRepository) {
        this.revokedTokenRepository = revokedTokenRepository;
    }
    value() {
        return async (token) => {
            if (token && (await this.revokedTokenRepository.get(token))) {
                throw new rest_1.HttpErrors.Unauthorized("Token is revoked" /* TokenRevoked */);
            }
            const user = jsonwebtoken_1.verify(token, process.env.JWT_SECRET, {
                issuer: process.env.JWT_ISSUER,
            });
            return user;
        };
    }
};
BearerTokenVerifyProvider = __decorate([
    __param(0, repository_1.repository(repositories_1.RevokedTokenRepository)),
    __metadata("design:paramtypes", [repositories_1.RevokedTokenRepository])
], BearerTokenVerifyProvider);
exports.BearerTokenVerifyProvider = BearerTokenVerifyProvider;
//# sourceMappingURL=bearer-token-verify.provider.js.map