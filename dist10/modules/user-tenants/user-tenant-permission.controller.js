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
let UserTenantPermissionController = class UserTenantPermissionController {
    constructor(userTenantPermissionRepository) {
        this.userTenantPermissionRepository = userTenantPermissionRepository;
    }
    async create(userTenantPermission) {
        return await this.userTenantPermissionRepository.create(userTenantPermission);
    }
    async count(where) {
        return await this.userTenantPermissionRepository.count(where);
    }
    async find(filter) {
        return await this.userTenantPermissionRepository.find(filter);
    }
    async updateAll(userTenantPermission, where) {
        return await this.userTenantPermissionRepository.updateAll(userTenantPermission, where);
    }
    async findById(id) {
        return await this.userTenantPermissionRepository.findById(id);
    }
    async updateById(id, userTenantPermission) {
        await this.userTenantPermissionRepository.updateById(id, userTenantPermission);
    }
    async replaceById(id, userTenantPermission) {
        await this.userTenantPermissionRepository.replaceById(id, userTenantPermission);
    }
    async deleteById(id) {
        await this.userTenantPermissionRepository.deleteById(id);
    }
};
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/user-tenant-permissions', {
        responses: {
            '200': {
                description: 'UserTenantPermission model instance',
                content: {
                    'application/json': { schema: { 'x-ts-type': models_1.UserTenantPermission } },
                },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.UserTenantPermission]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "create", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/user-tenant-permissions/count', {
        responses: {
            '200': {
                description: 'UserTenantPermission model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.UserTenantPermission))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "count", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/user-tenant-permissions', {
        responses: {
            '200': {
                description: 'Array of UserTenantPermission model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.UserTenantPermission } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.UserTenantPermission))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "find", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.patch('/user-tenant-permissions', {
        responses: {
            '200': {
                description: 'UserTenantPermission PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserTenantPermission, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.UserTenantPermission))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.UserTenantPermission, Object]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "updateAll", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.get('/user-tenant-permissions/{id}', {
        responses: {
            '200': {
                description: 'UserTenantPermission model instance',
                content: {
                    'application/json': { schema: { 'x-ts-type': models_1.UserTenantPermission } },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "findById", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.patch('/user-tenant-permissions/{id}', {
        responses: {
            '204': {
                description: 'UserTenantPermission PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserTenantPermission, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.UserTenantPermission]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "updateById", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.put('/user-tenant-permissions/{id}', {
        responses: {
            '204': {
                description: 'UserTenantPermission PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.UserTenantPermission]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "replaceById", null);
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.del('/user-tenant-permissions/{id}', {
        responses: {
            '204': {
                description: 'UserTenantPermission DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTenantPermissionController.prototype, "deleteById", null);
UserTenantPermissionController = __decorate([
    __param(0, repository_1.repository(repositories_1.UserTenantPermissionRepository)),
    __metadata("design:paramtypes", [repositories_1.UserTenantPermissionRepository])
], UserTenantPermissionController);
exports.UserTenantPermissionController = UserTenantPermissionController;
//# sourceMappingURL=user-tenant-permission.controller.js.map