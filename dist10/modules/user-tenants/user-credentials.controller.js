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
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const repository_1 = require("@loopback/repository");
const loopback4_authorization_1 = require("loopback4-authorization");
let UserCredentialsController = class UserCredentialsController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createAccount(userId, credentials) {
        console.log('hello!');
        return await this.userRepository.credentials(userId).create(credentials);
    }
};
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/users/{id}/credentials'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, models_1.UserCredentials]),
    __metadata("design:returntype", Promise)
], UserCredentialsController.prototype, "createAccount", null);
UserCredentialsController = __decorate([
    __param(0, repository_1.repository(repositories_1.UserRepository)),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], UserCredentialsController);
exports.UserCredentialsController = UserCredentialsController;
//# sourceMappingURL=user-credentials.controller.js.map