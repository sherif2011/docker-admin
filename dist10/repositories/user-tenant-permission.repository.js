"use strict";
// import {Getter, inject} from '@loopback/core';
// import {BelongsToAccessor, repository} from '@loopback/repository';
// import {AuthenticationBindings} from 'loopback4-authentication';
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
// import {PgdbDataSource} from '../datasources';
// import {
//   UserTenant,
//   UserTenantPermission,
//   UserTenantPermissionRelations,
// } from '../models';
// import {AuthUser} from '../modules/auth';
// import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';
// import {UserTenantRepository} from './user-tenant.repository';
// export class UserTenantPermissionRepository extends DefaultUserModifyCrudRepository<
//   UserTenantPermission,
//   typeof UserTenantPermission.prototype.id,
//   UserTenantPermissionRelations
// > {
//   public readonly userTenant: BelongsToAccessor<
//     UserTenant,
//     typeof UserTenantPermission.prototype.id
//   >;
//   constructor(
//     @inject('datasources.pgdb') dataSource: PgdbDataSource,
//     @repository.getter(UserTenantRepository)
//     utRepositoryGetter: Getter<UserTenantRepository>,
//     @inject.getter(AuthenticationBindings.CURRENT_USER)
//     protected readonly getCurrentUser: Getter<AuthUser | undefined>,
//   ) {
//     super(UserTenantPermission, dataSource, getCurrentUser);
//     this.userTenant = this.createBelongsToAccessorFor(
//       'user_tenant_id',
//       utRepositoryGetter,
//     );
//   }
// }
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let UserTenantPermissionRepository = class UserTenantPermissionRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.UserTenantPermission, dataSource);
    }
};
UserTenantPermissionRepository = __decorate([
    __param(0, core_1.inject('datasources.pgdb')),
    __metadata("design:paramtypes", [datasources_1.PgdbDataSource])
], UserTenantPermissionRepository);
exports.UserTenantPermissionRepository = UserTenantPermissionRepository;
//# sourceMappingURL=user-tenant-permission.repository.js.map