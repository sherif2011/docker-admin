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
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
let AuditLogController = class AuditLogController {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    async create(auditLog) {
        return await this.auditLogRepository.create(auditLog);
    }
    async count(where) {
        return await this.auditLogRepository.count(where);
    }
    async find(filter) {
        return await this.auditLogRepository.find(filter);
    }
    async updateAll(auditLog, where) {
        return await this.auditLogRepository.updateAll(auditLog, where);
    }
    async findById(id) {
        return await this.auditLogRepository.findById(id);
    }
    async updateById(id, auditLog) {
        await this.auditLogRepository.updateById(id, auditLog);
    }
    async replaceById(id, auditLog) {
        await this.auditLogRepository.replaceById(id, auditLog);
    }
    async deleteById(id) {
        await this.auditLogRepository.deleteById(id);
    }
};
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["CreateAudit" /* CreateAudit */]),
    rest_1.post('/audit-logs', {
        responses: {
            '200': {
                description: 'AuditLog model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.AuditLog } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.AuditLog]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "create", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["ViewAudit" /* ViewAudit */]),
    rest_1.get('/audit-logs/count', {
        responses: {
            '200': {
                description: 'AuditLog model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.AuditLog))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "count", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["ViewAudit" /* ViewAudit */]),
    rest_1.get('/audit-logs', {
        responses: {
            '200': {
                description: 'Array of AuditLog model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.AuditLog } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.AuditLog))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "find", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["UpdateAudit" /* UpdateAudit */]),
    rest_1.patch('/audit-logs', {
        responses: {
            '200': {
                description: 'AuditLog PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.AuditLog))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.AuditLog, Object]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "updateAll", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["ViewAudit" /* ViewAudit */]),
    rest_1.get('/audit-logs/{id}', {
        responses: {
            '200': {
                description: 'AuditLog model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.AuditLog } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "findById", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["UpdateAudit" /* UpdateAudit */]),
    rest_1.patch('/audit-logs/{id}', {
        responses: {
            '204': {
                description: 'AuditLog PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.AuditLog]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "updateById", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["UpdateAudit" /* UpdateAudit */]),
    rest_1.put('/audit-logs/{id}', {
        responses: {
            '204': {
                description: 'AuditLog PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.AuditLog]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "replaceById", null);
__decorate([
    loopback4_authentication_1.authenticate("bearer" /* BEARER */),
    loopback4_authorization_1.authorize(["DeleteAudit" /* DeleteAudit */]),
    rest_1.del('/audit-logs/{id}', {
        responses: {
            '204': {
                description: 'AuditLog DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuditLogController.prototype, "deleteById", null);
AuditLogController = __decorate([
    __param(0, repository_1.repository(repositories_1.AuditLogRepository)),
    __metadata("design:paramtypes", [repositories_1.AuditLogRepository])
], AuditLogController);
exports.AuditLogController = AuditLogController;
//# sourceMappingURL=audit-log.controller.js.map