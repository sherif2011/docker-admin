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
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const url_1 = require("url");
const content_type_constant_1 = require("../../controllers/content-type.constant");
const repositories_1 = require("../../repositories");
const _1 = require("./");
const auth_user_model_1 = require("./models/auth-user.model");
const token_response_dto_1 = require("./models/token-response.dto");
let LoginController = class LoginController {
    // sonarignore_start
    constructor(client, user, getUserPermissions, authClientRepository, userRepo, userTenantRepo, utPermsRepo, utClientsRepo, refreshTokenRepo) {
        this.client = client;
        this.user = user;
        this.getUserPermissions = getUserPermissions;
        this.authClientRepository = authClientRepository;
        this.userRepo = userRepo;
        this.userTenantRepo = userTenantRepo;
        this.utPermsRepo = utPermsRepo;
        this.utClientsRepo = utClientsRepo;
        this.refreshTokenRepo = refreshTokenRepo;
    }
    // sonarignore_end
    async login(req) {
        if (!this.client || !this.user) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
        }
        else if (!req.client_secret) {
            throw new rest_1.HttpErrors.BadRequest("Client Secret Missing" /* ClientSecretMissing */);
        }
        try {
            const codePayload = {
                clientId: req.client_id,
                userId: this.user.id,
            };
            const token = jwt.sign(codePayload, this.client.secret, {
                expiresIn: this.client.authCodeExpiration,
                audience: req.client_id,
                subject: req.username,
                issuer: process.env.JWT_ISSUER,
            });
            return {
                code: token,
            };
        }
        catch (error) {
            throw new rest_1.HttpErrors.InternalServerError("Invalid redentials" /* InvalidCredentials */);
        }
    }
    async loginWithClientUser(req) {
        if (!this.client || !this.user) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
        }
        else if (!this.client.userIds || this.client.userIds.length === 0) {
            throw new rest_1.HttpErrors.UnprocessableEntity("Client User Missing" /* ClientUserMissing */);
        }
        else if (!req.client_secret) {
            throw new rest_1.HttpErrors.BadRequest("Client Secret Missing" /* ClientSecretMissing */);
        }
        try {
            const payload = {
                clientId: this.client.clientId,
                user: this.user,
            };
            return await this.createJWT(payload, this.client);
        }
        catch (error) {
            throw new rest_1.HttpErrors.InternalServerError("Invalid redentials" /* InvalidCredentials */);
        }
    }
    async getToken(req) {
        const authClient = await this.authClientRepository.findOne({
            where: {
                clientId: req.clientId,
            },
        });
        if (!authClient) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
        }
        try {
            const payload = jwt.verify(req.code, authClient.secret, {
                audience: req.clientId,
                subject: req.username,
                issuer: process.env.JWT_ISSUER,
            });
            return await this.createJWT(payload, authClient);
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new rest_1.HttpErrors.Unauthorized("Code Expired" /* CodeExpired */);
                // eslint-disable-next-line no-prototype-builtins
            }
            else if (rest_1.HttpErrors.HttpError.prototype.isPrototypeOf(error)) {
                throw error;
            }
            else {
                throw new rest_1.HttpErrors.Unauthorized("Invalid redentials" /* InvalidCredentials */);
            }
        }
    }
    async exchangeToken(req) {
        const refreshPayload = await this.refreshTokenRepo.get(req.refreshToken);
        if (!refreshPayload) {
            throw new rest_1.HttpErrors.Unauthorized("Token Expired" /* TokenExpired */);
        }
        const authClient = await this.authClientRepository.findOne({
            where: {
                clientId: refreshPayload.clientId,
            },
        });
        if (!authClient) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
        }
        return this.createJWT({ clientId: refreshPayload.clientId, userId: refreshPayload.userId }, authClient);
    }
    async loginViaGoogle(clientId, clientSecret) { }
    async googleCallback(code, state, response) {
        const clientId = new url_1.URLSearchParams(state).get('client_id');
        if (!clientId || !this.user) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
        }
        const client = await this.authClientRepository.findOne({
            where: {
                clientId: clientId,
            },
        });
        if (!client || !client.redirectUrl) {
            throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
        }
        try {
            const codePayload = {
                clientId,
                user: this.user,
            };
            const token = jwt.sign(codePayload, client.secret, {
                expiresIn: client.authCodeExpiration,
                audience: clientId,
                subject: this.user.username,
                issuer: process.env.JWT_ISSUER,
            });
            response.redirect(`${client.redirectUrl}?code=${token}`);
        }
        catch (error) {
            throw new rest_1.HttpErrors.InternalServerError("Unknown Error" /* UnknownError */);
        }
    }
    async createJWT(payload, authClient) {
        try {
            let user;
            if (payload.user) {
                user = payload.user;
            }
            else if (payload.userId) {
                user = await this.userRepo.findById(payload.userId);
            }
            if (!user) {
                throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* UserDoesNotExist */);
            }
            const userTenant = await this.userTenantRepo.findOne({
                where: {
                    userId: user.getId(),
                    tenantId: user.defaultTenant,
                },
            });
            if (!userTenant) {
                throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* UserDoesNotExist */);
            }
            else if (userTenant.status !== 'active') {
                throw new rest_1.HttpErrors.Unauthorized("User is inactive" /* UserInactive */);
            }
            // Create user DTO for payload to JWT
            const authUser = new auth_user_model_1.AuthUser(user);
            authUser.tenant = await this.userTenantRepo.tenant(userTenant.id);
            const role = await this.userTenantRepo.role(userTenant.id);
            const group = await this.userTenantRepo.group(userTenant.id);
            const utPerms = await this.utPermsRepo.find({
                where: {
                    userTenantId: userTenant.id,
                },
                fields: {
                    permission: true,
                    allowed: true,
                },
            });
            const utClients = await this.utClientsRepo.find({
                where: {
                    userTenantId: userTenant.id,
                },
                fields: {
                    client: true,
                    allowed: true,
                },
            });
            utClients.forEach(a => {
                if (a.allowed === true)
                    group.clients.push(a.client);
                else {
                    let idx = group.clients.indexOf(a.client, 0);
                    if (idx >= 0)
                        group.clients.splice(idx, 1);
                }
            });
            authUser.clients = group.clients;
            authUser.permissions = this.getUserPermissions(utPerms, role.permissions);
            authUser.role = role.roleKey.toString();
            const accessToken = jwt.sign(authUser.toJSON(), process.env.JWT_SECRET, {
                expiresIn: authClient.accessTokenExpiration,
                issuer: process.env.JWT_ISSUER,
            });
            const size = 32, ms = 1000;
            const refreshToken = crypto.randomBytes(size).toString('hex');
            // Set refresh token into redis for later verification
            await this.refreshTokenRepo.set(refreshToken, { clientId: authClient.clientId, userId: user.id }, { ttl: authClient.refreshTokenExpiration * ms });
            return new token_response_dto_1.TokenResponse({ accessToken, refreshToken });
        }
        catch (error) {
            // eslint-disable-next-line no-prototype-builtins
            if (rest_1.HttpErrors.HttpError.prototype.isPrototypeOf(error)) {
                throw error;
            }
            else {
                throw new rest_1.HttpErrors.Unauthorized("Invalid redentials" /* InvalidCredentials */);
            }
        }
    }
};
__decorate([
    loopback4_authentication_1.authenticateClient("client-password" /* CLIENT_PASSWORD */),
    loopback4_authentication_1.authenticate("local" /* LOCAL */),
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/auth/login', {
        responses: {
            [200 /* OK */]: {
                description: 'Auth Code',
                content: {
                    [content_type_constant_1.CONTENT_TYPE.JSON]: Object,
                },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.LoginRequest]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    loopback4_authentication_1.authenticateClient("client-password" /* CLIENT_PASSWORD */),
    loopback4_authentication_1.authenticate("OAuth2 resource owner grant" /* OAUTH2_RESOURCE_OWNER_GRANT */),
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/auth/login-token', {
        responses: {
            [200 /* OK */]: {
                description: 'Token Response Model',
                content: {
                    [content_type_constant_1.CONTENT_TYPE.JSON]: {
                        schema: { 'x-ts-type': token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.LoginRequest]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginWithClientUser", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/auth/token', {
        responses: {
            [200 /* OK */]: {
                description: 'Token Response',
                content: {
                    [content_type_constant_1.CONTENT_TYPE.JSON]: {
                        schema: { 'x-ts-type': token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.AuthTokenRequest]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getToken", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/auth/token-refresh', {
        responses: {
            [200 /* OK */]: {
                description: 'Token Response',
                content: {
                    [content_type_constant_1.CONTENT_TYPE.JSON]: {
                        schema: { 'x-ts-type': token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_1.AuthRefreshTokenRequest]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "exchangeToken", null);
__decorate([
    loopback4_authentication_1.authenticateClient("client-password" /* CLIENT_PASSWORD */),
    loopback4_authentication_1.authenticate("Google Oauth 2.0" /* GOOGLE_OAUTH2 */, {
        accessType: 'offline',
        scope: ['profile', 'email'],
        authorizationURL: process.env.GOOGLE_AUTH_URL,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
        clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        tokenURL: process.env.GOOGLE_AUTH_TOKEN_URL,
    }, (req) => {
        return {
            accessType: 'offline',
            state: Object.keys(req.query)
                .map(key => key + '=' + req.query[key])
                .join('&'),
        };
    }),
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/auth/google', {
        responses: {
            [200 /* OK */]: {
                description: 'Token Response',
                content: {
                    [content_type_constant_1.CONTENT_TYPE.JSON]: {
                        schema: { 'x-ts-type': token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.string('client_id')),
    __param(1, rest_1.param.query.string('client_secret')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginViaGoogle", null);
__decorate([
    loopback4_authentication_1.authenticate("Google Oauth 2.0" /* GOOGLE_OAUTH2 */, {
        accessType: 'offline',
        scope: ['profile', 'email'],
        authorizationURL: process.env.GOOGLE_AUTH_URL,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
        clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        tokenURL: process.env.GOOGLE_AUTH_TOKEN_URL,
    }, (req) => {
        return {
            accessType: 'offline',
            state: Object.keys(req.query)
                .map(key => `${key}=${req.query[key]}`)
                .join('&'),
        };
    }),
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/auth/google-auth-redirect', {
        responses: {
            [200 /* OK */]: {
                description: 'Token Response',
                content: {
                    [content_type_constant_1.CONTENT_TYPE.JSON]: {
                        schema: { 'x-ts-type': token_response_dto_1.TokenResponse },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.string('code')),
    __param(1, rest_1.param.query.string('state')),
    __param(2, context_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "googleCallback", null);
LoginController = __decorate([
    __param(0, context_1.inject(loopback4_authentication_1.AuthenticationBindings.CURRENT_CLIENT)),
    __param(1, context_1.inject(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    __param(2, context_1.inject(loopback4_authorization_1.AuthorizationBindings.USER_PERMISSIONS)),
    __param(3, repository_1.repository(repositories_1.AuthClientRepository)),
    __param(4, repository_1.repository(repositories_1.UserRepository)),
    __param(5, repository_1.repository(repositories_1.UserTenantRepository)),
    __param(6, repository_1.repository(repositories_1.UserTenantPermissionRepository)),
    __param(7, repository_1.repository(repositories_1.UserTenantClientRepository)),
    __param(8, repository_1.repository(repositories_1.RefreshTokenRepository)),
    __metadata("design:paramtypes", [Object, Object, Function, repositories_1.AuthClientRepository,
        repositories_1.UserRepository,
        repositories_1.UserTenantRepository,
        repositories_1.UserTenantPermissionRepository,
        repositories_1.UserTenantClientRepository,
        repositories_1.RefreshTokenRepository])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map