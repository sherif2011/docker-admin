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
const user_modifiable_entity_model_1 = require("./user-modifiable-entity.model");
const user_tenant_model_1 = require("./user-tenant.model");
let UserTenantPermission = class UserTenantPermission extends user_modifiable_entity_model_1.UserModifiableEntity {
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
], UserTenantPermission.prototype, "id", void 0);
__decorate([
    repository_1.belongsTo(() => user_tenant_model_1.UserTenant, { keyFrom: 'user_tenant_id', name: 'user_tenant_id' }, {
        name: 'user_tenant_id',
        required: true,
    }),
    __metadata("design:type", Number)
], UserTenantPermission.prototype, "userTenantId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], UserTenantPermission.prototype, "permission", void 0);
__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserTenantPermission.prototype, "allowed", void 0);
UserTenantPermission = __decorate([
    repository_1.model({
        name: 'user_tenant_permissions',
    }),
    __metadata("design:paramtypes", [Object])
], UserTenantPermission);
exports.UserTenantPermission = UserTenantPermission;
//# sourceMappingURL=user-tenant-permission.model.js.map