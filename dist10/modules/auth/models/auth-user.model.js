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
const models_1 = require("../../../models");
let AuthUser = class AuthUser extends models_1.User {
    constructor(data) {
        super(data);
        this.permissions = [];
        this.clients = [];
    }
};
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    __metadata("design:type", Array)
], AuthUser.prototype, "permissions", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    __metadata("design:type", Array)
], AuthUser.prototype, "clients", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], AuthUser.prototype, "role", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], AuthUser.prototype, "group", void 0);
__decorate([
    repository_1.property({
        type: models_1.Tenant,
        required: true,
    }),
    __metadata("design:type", models_1.Tenant)
], AuthUser.prototype, "tenant", void 0);
__decorate([
    repository_1.property({
        type: 'string',
    }),
    __metadata("design:type", String)
], AuthUser.prototype, "externalAuthToken", void 0);
__decorate([
    repository_1.property({
        type: 'string',
    }),
    __metadata("design:type", String)
], AuthUser.prototype, "externalRefreshToken", void 0);
AuthUser = __decorate([
    repository_1.model(),
    __metadata("design:paramtypes", [Object])
], AuthUser);
exports.AuthUser = AuthUser;
//# sourceMappingURL=auth-user.model.js.map