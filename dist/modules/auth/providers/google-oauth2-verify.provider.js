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
const models_1 = require("../../../models");
const repositories_1 = require("../../../repositories");
const auth_user_model_1 = require("../models/auth-user.model");
let GoogleOauth2VerifyProvider = class GoogleOauth2VerifyProvider {
    constructor(userRepository, userCredsRepository) {
        this.userRepository = userRepository;
        this.userCredsRepository = userCredsRepository;
    }
    value() {
        return async (accessToken, refreshToken, profile) => {
            const user = await this.userRepository.findOne({
                where: {
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    email: profile._json.email,
                },
            });
            if (!user) {
                throw new rest_1.HttpErrors.Unauthorized("Invalid redentials" /* InvalidCredentials */);
            }
            const creds = await this.userCredsRepository.findOne({
                where: {
                    userId: user.id,
                },
            });
            if (!creds ||
                creds.authProvider !== 'google' ||
                creds.authId !== profile.id) {
                throw new rest_1.HttpErrors.Unauthorized("Invalid redentials" /* InvalidCredentials */);
            }
            const authUser = new auth_user_model_1.AuthUser(user);
            authUser.permissions = [];
            authUser.externalAuthToken = accessToken;
            authUser.externalRefreshToken = refreshToken;
            authUser.tenant = new models_1.Tenant({ id: user.defaultTenant });
            return authUser;
        };
    }
};
GoogleOauth2VerifyProvider = __decorate([
    __param(0, repository_1.repository(repositories_1.UserRepository)),
    __param(1, repository_1.repository(repositories_1.UserCredentialsRepository)),
    __metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserCredentialsRepository])
], GoogleOauth2VerifyProvider);
exports.GoogleOauth2VerifyProvider = GoogleOauth2VerifyProvider;
//# sourceMappingURL=google-oauth2-verify.provider.js.map