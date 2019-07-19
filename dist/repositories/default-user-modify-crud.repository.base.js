"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loopback4_soft_delete_1 = require("loopback4-soft-delete");
const rest_1 = require("@loopback/rest");
class DefaultUserModifyCrudRepository extends loopback4_soft_delete_1.SoftCrudRepository {
    constructor(entityClass, dataSource, getCurrentUser) {
        super(entityClass, dataSource);
        this.getCurrentUser = getCurrentUser;
    }
    async create(entity, options) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid redentials" /* InvalidCredentials */);
        }
        entity.createdBy = currentUser.id;
        entity.modifiedBy = currentUser.id;
        return super.create(entity, options);
    }
    async createAll(entities, options) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid redentials" /* InvalidCredentials */);
        }
        entities.forEach(entity => {
            entity.createdBy = currentUser ? currentUser.id : 0;
            entity.modifiedBy = currentUser ? currentUser.id : 0;
        });
        return super.createAll(entities, options);
    }
    async save(entity, options) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid redentials" /* InvalidCredentials */);
        }
        entity.modifiedBy = currentUser.id;
        return super.save(entity, options);
    }
    async update(entity, options) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid redentials" /* InvalidCredentials */);
        }
        entity.modifiedBy = currentUser.id;
        return super.update(entity, options);
    }
    async updateAll(data, where, options) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid redentials" /* InvalidCredentials */);
        }
        data.modifiedBy = currentUser.id;
        return super.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid redentials" /* InvalidCredentials */);
        }
        data.modifiedBy = currentUser.id;
        return super.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid redentials" /* InvalidCredentials */);
        }
        data.modifiedBy = currentUser.id;
        return super.replaceById(id, data, options);
    }
}
exports.DefaultUserModifyCrudRepository = DefaultUserModifyCrudRepository;
//# sourceMappingURL=default-user-modify-crud.repository.base.js.map