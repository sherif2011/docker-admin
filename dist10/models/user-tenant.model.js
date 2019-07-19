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
const tenant_model_1 = require("./tenant.model");
const user_model_1 = require("./user.model");
const role_model_1 = require("./role.model");
const group_model_1 = require("./group.model");
let UserTenant = class UserTenant extends base_entity_model_1.BaseEntity {
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
], UserTenant.prototype, "id", void 0);
__decorate([
    repository_1.belongsTo(() => user_model_1.User, { keyFrom: 'user_id', name: 'user_id' }, {
        name: 'user_id',
        required: true,
    }),
    __metadata("design:type", Number)
], UserTenant.prototype, "userId", void 0);
__decorate([
    repository_1.belongsTo(() => tenant_model_1.Tenant, { keyFrom: 'tenant_id', name: 'tenant_id' }, {
        name: 'tenant_id',
        required: true,
    }),
    __metadata("design:type", Number)
], UserTenant.prototype, "tenantId", void 0);
__decorate([
    repository_1.belongsTo(() => role_model_1.Role, { keyFrom: 'role_id', name: 'role_id' }, {
        name: 'role_id',
        required: true,
    }),
    __metadata("design:type", Number)
], UserTenant.prototype, "roleId", void 0);
__decorate([
    repository_1.belongsTo(() => group_model_1.Group, { keyFrom: 'group_id', name: 'group_id' }, {
        name: 'group_id',
        required: true,
    }),
    __metadata("design:type", Number)
], UserTenant.prototype, "groupId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        default: 'active',
    }),
    __metadata("design:type", String)
], UserTenant.prototype, "status", void 0);
UserTenant = __decorate([
    repository_1.model({
        name: 'user_tenants',
    }),
    __metadata("design:paramtypes", [Object])
], UserTenant);
exports.UserTenant = UserTenant;
//# sourceMappingURL=user-tenant.model.js.map