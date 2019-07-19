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
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const models_1 = require("../../models");
const repositories_1 = require("../../repositories");
let RoleController = class RoleController {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(role) {
        return await this.roleRepository.create(role);
    }
    async count(where) {
        return await this.roleRepository.count(where);
    }
    async find(filter) {
        return await this.roleRepository.find(filter);
    }
    async updateAll(role, where) {
        return await this.roleRepository.updateAll(role, where);
    }
    async findById(id) {
        return await this.roleRepository.findById(id);
    }
    async updateById(id, role) {
        await this.roleRepository.updateById(id, role);
    }
    async replaceById(id, role) {
        await this.roleRepository.replaceById(id, role);
    }
    async deleteById(id) {
        await this.roleRepository.deleteById(id);
    }
};
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["CreateRole" /* CreateRole */]),
    rest_1.post('/roles', {
        responses: {
            '200': {
                description: 'Role model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Role } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Role]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["ViewRole" /* ViewRole */]),
    rest_1.get('/roles/count', {
        responses: {
            '200': {
                description: 'Role model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Role))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "count", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["ViewRole" /* ViewRole */]),
    rest_1.get('/roles', {
        responses: {
            '200': {
                description: 'Array of Role model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Role } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Role))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "find", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["UpdateRole" /* UpdateRole */]),
    rest_1.patch('/roles', {
        responses: {
            '200': {
                description: 'Role PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Role))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Role, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateAll", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["ViewRole" /* ViewRole */]),
    rest_1.get('/roles/{id}', {
        responses: {
            '200': {
                description: 'Role model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Role } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findById", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["UpdateRole" /* UpdateRole */]),
    rest_1.patch('/roles/{id}', {
        responses: {
            '204': {
                description: 'Role PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Role]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateById", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["UpdateRole" /* UpdateRole */]),
    rest_1.put('/roles/{id}', {
        responses: {
            '204': {
                description: 'Role PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Role]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "replaceById", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["DeleteRole" /* DeleteRole */]),
    rest_1.del('/roles/{id}', {
        responses: {
            '204': {
                description: 'Role DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteById", null);
RoleController = __decorate([
    __param(0, repository_1.repository(repositories_1.RoleRepository)),
    __metadata("design:paramtypes", [repositories_1.RoleRepository])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map