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
const models_1 = require("../../models");
const repositories_1 = require("../../repositories");
const loopback4_authorization_1 = require("loopback4-authorization");
let UserTenantClientController = class UserTenantClientController {
    constructor(userTenantClientRepository) {
        this.userTenantClientRepository = userTenantClientRepository;
    }
    async create(userTenantClient) {
        return await this.userTenantClientRepository.create(userTenantClient);
    }
    async count(where) {
        return await this.userTenantClientRepository.count(where);
    }
    async find(filter) {
        return await this.userTenantClientRepository.find(filter);
    }
    async updateAll(userTenantClient, where) {
        return await this.userTenantClientRepository.updateAll(userTenantClient, where);
    }
    async findById(id) {
        return await this.userTenantClientRepository.findById(id);
    }
    async updateById(id, userTenantClient) {
        await this.userTenantClientRepository.updateById(id, userTenantClient);
    }
    async replaceById(id, userTenantClient) {
        await this.userTenantClientRepository.replaceById(id, userTenantClient);
    }
    async deleteById(id) {
        await this.userTenantClientRepository.deleteById(id);
    }
};
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/user-tenant-clients', {
        responses: {
            '200': {
                description: 'UserTenantClient model instance',
                content: {
                    'application/json': { schema: { 'x-ts-type': models_1.UserTenantClient } },
                },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.UserTenantClient]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "create", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/user-tenant-clients/count', {
        responses: {
            '200': {
                description: 'UserTenantClient model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.UserTenantClient))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "count", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/user-tenant-clients', {
        responses: {
            '200': {
                description: 'Array of UserTenantClient model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.UserTenantClient } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.UserTenantClient))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "find", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.patch('/user-tenant-clients', {
        responses: {
            '200': {
                description: 'UserTenantClient PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserTenantClient, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.UserTenantClient))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.UserTenantClient, Object]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "updateAll", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/user-tenant-clients/{id}', {
        responses: {
            '200': {
                description: 'UserTenantClient model instance',
                content: {
                    'application/json': { schema: { 'x-ts-type': models_1.UserTenantClient } },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "findById", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.patch('/user-tenant-clients/{id}', {
        responses: {
            '204': {
                description: 'UserTenantClient PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserTenantClient, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.UserTenantClient]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "updateById", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.put('/user-tenant-clients/{id}', {
        responses: {
            '204': {
                description: 'UserTenantClient PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.UserTenantClient]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "replaceById", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.del('/user-tenant-clients/{id}', {
        responses: {
            '204': {
                description: 'UserTenantClient DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTenantClientController.prototype, "deleteById", null);
UserTenantClientController = __decorate([
    __param(0, repository_1.repository(repositories_1.UserTenantClientRepository)),
    __metadata("design:paramtypes", [repositories_1.UserTenantClientRepository])
], UserTenantClientController);
exports.UserTenantClientController = UserTenantClientController;
//# sourceMappingURL=user-tenant-client.controller.js.map