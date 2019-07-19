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
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const repositories_1 = require("../../repositories");
let LogoutController = class LogoutController {
    constructor(req, revokedTokens) {
        this.req = req;
        this.revokedTokens = revokedTokens;
    }
    async logout(auth) {
        try {
            const token = auth && auth.replace(/bearer /i, '');
            if (!token) {
                throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* TokenInvalid */);
            }
            await this.revokedTokens.set(token, { token });
        }
        catch (err) {
            throw new rest_1.HttpErrors.InternalServerError("Unknown Error" /* UnknownError */);
        }
        return true;
    }
};
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/logout'),
    __param(0, rest_1.param.header.string('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogoutController.prototype, "logout", null);
LogoutController = __decorate([
    __param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    __param(1, repository_1.repository(repositories_1.RevokedTokenRepository)),
    __metadata("design:paramtypes", [Object, repositories_1.RevokedTokenRepository])
], LogoutController);
exports.LogoutController = LogoutController;
//# sourceMappingURL=logout.controller.js.map