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
const _1 = require(".");
const user_model_1 = require("./user.model");
let UserCredentials = class UserCredentials extends _1.BaseEntity {
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
], UserCredentials.prototype, "id", void 0);
__decorate([
    repository_1.belongsTo(() => user_model_1.User, { keyFrom: 'user_id', name: 'user_id' }, {
        name: 'user_id',
        required: true,
    }),
    __metadata("design:type", Number)
], UserCredentials.prototype, "userId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        name: 'auth_provider',
    }),
    __metadata("design:type", String)
], UserCredentials.prototype, "authProvider", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        name: 'auth_id',
    }),
    __metadata("design:type", String)
], UserCredentials.prototype, "authId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        name: 'auth_token',
    }),
    __metadata("design:type", String)
], UserCredentials.prototype, "authToken", void 0);
__decorate([
    repository_1.property({
        type: 'string',
    }),
    __metadata("design:type", String)
], UserCredentials.prototype, "password", void 0);
UserCredentials = __decorate([
    repository_1.model({
        name: 'user_credentials',
    }),
    __metadata("design:paramtypes", [Object])
], UserCredentials);
exports.UserCredentials = UserCredentials;
//# sourceMappingURL=user-credentials.model.js.map