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
let AuditLog = class AuditLog extends repository_1.Entity {
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
], AuditLog.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        name: 'operation_name',
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "operationName", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        name: 'operation_time',
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "operationTime", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        name: 'table_name',
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "tableName", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        name: 'log_type',
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "logType", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        name: 'entity_id',
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "entityId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        name: 'user_id',
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "userId", void 0);
__decorate([
    repository_1.property({
        type: 'object',
    }),
    __metadata("design:type", Object)
], AuditLog.prototype, "before", void 0);
__decorate([
    repository_1.property({
        type: 'object',
    }),
    __metadata("design:type", Object)
], AuditLog.prototype, "after", void 0);
AuditLog = __decorate([
    repository_1.model({
        name: 'audit_logs',
    }),
    __metadata("design:paramtypes", [Object])
], AuditLog);
exports.AuditLog = AuditLog;
//# sourceMappingURL=audit-log.model.js.map