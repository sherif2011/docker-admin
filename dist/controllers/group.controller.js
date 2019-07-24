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
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const loopback4_authorization_1 = require("loopback4-authorization");
let GroupController = class GroupController {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async create(group) {
        console.log('i am here!');
        return await this.groupRepository.create(group);
    }
    async count(where) {
        return await this.groupRepository.count(where);
    }
    async find(filter) {
        return await this.groupRepository.find(filter);
    }
    async updateAll(group, where) {
        return await this.groupRepository.updateAll(group, where);
    }
    async findById(id) {
        return await this.groupRepository.findById(id);
    }
    async updateById(id, group) {
        await this.groupRepository.updateById(id, group);
    }
    async replaceById(id, group) {
        await this.groupRepository.replaceById(id, group);
    }
    async deleteById(id) {
        await this.groupRepository.deleteById(id);
    }
};
__decorate([
    loopback4_authorization_1.authorize(['*']),
    rest_1.post('/groups', {
        responses: {
            '200': {
                description: 'Group model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Group } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Group]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    rest_1.get('/groups/count', {
        responses: {
            '200': {
                description: 'Group model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Group))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "count", null);
__decorate([
    rest_1.get('/groups', {
        responses: {
            '200': {
                description: 'Array of Group model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Group } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Group))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "find", null);
__decorate([
    rest_1.patch('/groups', {
        responses: {
            '200': {
                description: 'Group PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Group, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Group))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Group, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/groups/{id}', {
        responses: {
            '200': {
                description: 'Group model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Group } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findById", null);
__decorate([
    rest_1.patch('/groups/{id}', {
        responses: {
            '204': {
                description: 'Group PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Group, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Group]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateById", null);
__decorate([
    rest_1.put('/groups/{id}', {
        responses: {
            '204': {
                description: 'Group PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Group]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/groups/{id}', {
        responses: {
            '204': {
                description: 'Group DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteById", null);
GroupController = __decorate([
    __param(0, repository_1.repository(repositories_1.GroupRepository)),
    __metadata("design:paramtypes", [repositories_1.GroupRepository])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=group.controller.js.map