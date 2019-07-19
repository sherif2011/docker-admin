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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const base_entity_model_1 = require("./base-entity.model");
let AuthClient = class AuthClient extends base_entity_model_1.BaseEntity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'number',
        id: true,
    }),
    __metadata("design:type", Number)
], AuthClient.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        name: 'client_id',
    }),
    __metadata("design:type", String)
], AuthClient.prototype, "clientId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        name: 'client_secret',
    }),
    __metadata("design:type", String)
], AuthClient.prototype, "clientSecret", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], AuthClient.prototype, "secret", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        name: 'redirect_url',
    }),
    __metadata("design:type", String)
], AuthClient.prototype, "redirectUrl", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'number',
        name: 'user_ids',
    }),
    __metadata("design:type", Array)
], AuthClient.prototype, "userIds", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        name: 'access_token_expiration',
    }),
    __metadata("design:type", Number)
], AuthClient.prototype, "accessTokenExpiration", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        name: 'refresh_token_expiration',
    }),
    __metadata("design:type", Number)
], AuthClient.prototype, "refreshTokenExpiration", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        name: 'auth_code_expiration',
    }),
    __metadata("design:type", Number)
], AuthClient.prototype, "authCodeExpiration", void 0);
AuthClient = __decorate([
    repository_1.model({
        name: 'auth_clients',
    }),
    __metadata("design:paramtypes", [Object])
], AuthClient);
exports.AuthClient = AuthClient;
//# sourceMappingURL=auth-client.model.js.map