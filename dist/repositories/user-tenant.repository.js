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
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const default_soft_crud_repository_base_1 = require("./default-soft-crud.repository.base");
const role_repository_1 = require("./role.repository");
const tenant_repository_1 = require("./tenant.repository");
const user_repository_1 = require("./user.repository");
const group_repository_1 = require("./group.repository");
let UserTenantRepository = class UserTenantRepository extends default_soft_crud_repository_base_1.DefaultSoftCrudRepository {
    constructor(dataSource, tenantRepositoryGetter, userRepositoryGetter, roleRepositoryGetter, groupRepositoryGetter) {
        super(models_1.UserTenant, dataSource);
        this.tenant = this.createBelongsToAccessorFor('tenant_id', tenantRepositoryGetter);
        this.user = this.createBelongsToAccessorFor('user_id', userRepositoryGetter);
        this.role = this.createBelongsToAccessorFor('role_id', roleRepositoryGetter);
        this.group = this.createBelongsToAccessorFor('group_id', groupRepositoryGetter);
    }
};
UserTenantRepository = __decorate([
    __param(0, core_1.inject('datasources.pgdb')),
    __param(1, repository_1.repository.getter(tenant_repository_1.TenantRepository)),
    __param(2, repository_1.repository.getter(user_repository_1.UserRepository)),
    __param(3, repository_1.repository.getter(role_repository_1.RoleRepository)),
    __param(4, repository_1.repository.getter(group_repository_1.GroupRepository)),
    __metadata("design:paramtypes", [datasources_1.PgdbDataSource, Function, Function, Function, Function])
], UserTenantRepository);
exports.UserTenantRepository = UserTenantRepository;
//# sourceMappingURL=user-tenant.repository.js.map