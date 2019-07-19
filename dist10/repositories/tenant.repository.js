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
const loopback4_authentication_1 = require("loopback4-authentication");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const default_user_modify_crud_repository_base_1 = require("./default-user-modify-crud.repository.base");
let TenantRepository = class TenantRepository extends default_user_modify_crud_repository_base_1.DefaultUserModifyCrudRepository {
    constructor(dataSource, getCurrentUser) {
        super(models_1.Tenant, dataSource, getCurrentUser);
        this.getCurrentUser = getCurrentUser;
    }
};
TenantRepository = __decorate([
    __param(0, core_1.inject('datasources.pgdb')),
    __param(1, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    __metadata("design:paramtypes", [datasources_1.PgdbDataSource, Function])
], TenantRepository);
exports.TenantRepository = TenantRepository;
//# sourceMappingURL=tenant.repository.js.map