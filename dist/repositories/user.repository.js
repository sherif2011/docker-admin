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
const rest_1 = require("@loopback/rest");
const bcrypt = require("bcrypt");
const loopback4_authentication_1 = require("loopback4-authentication");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const default_user_modify_crud_repository_base_1 = require("./default-user-modify-crud.repository.base");
let UserRepository = class UserRepository extends default_user_modify_crud_repository_base_1.DefaultUserModifyCrudRepository {
    constructor(dataSource, getCurrentUser, getUserCredsRepository) {
        super(models_1.User, dataSource, getCurrentUser);
        this.getCurrentUser = getCurrentUser;
        this.saltRounds = 10;
        this.credentials = this.createHasOneRepositoryFactoryFor('credentials', getUserCredsRepository);
    }
    async create(entity, options) {
        const user = await super.create(entity, options);
        try {
            // Add temporary password for first time
            const password = await bcrypt.hash(process.env.USER_TEMP_PASSWORD, this.saltRounds);
            const creds = new models_1.UserCredentials({
                authProvider: 'internal',
                password: password,
            });
            await this.credentials(user.id).create(creds);
        }
        catch (err) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Error while hashing password: ' + err);
        }
        return user;
    }
    async verifyPassword(username, password) {
        const user = await super.findOne({ where: { username } });
        const creds = user && (await this.credentials(user.id).get());
        if (!user || user.deleted || !creds || !creds.password) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* UserDoesNotExist */);
        }
        else if (!(await bcrypt.compare(password, creds.password))) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid redentials" /* InvalidCredentials */);
        }
        else if (await bcrypt.compare(password, process.env.USER_TEMP_PASSWORD)) {
            throw new rest_1.HttpErrors.Forbidden("Login not allowed using temporary password. Please reset password." /* TempPasswordLoginDisallowed */);
        }
        return user;
    }
    async updatePassword(username, password, newPassword) {
        const user = await super.findOne({ where: { username } });
        const creds = user && (await this.credentials(user.id).get());
        if (!user || user.deleted || !creds || !creds.password) {
            throw new rest_1.HttpErrors.Unauthorized("UserDoesNotExist" /* UserDoesNotExist */);
        }
        else if (!(await bcrypt.compare(password, creds.password))) {
            throw new rest_1.HttpErrors.Unauthorized("Incorrect Password" /* WrongPassword */);
        }
        else if (await bcrypt.compare(newPassword, creds.password)) {
            throw new rest_1.HttpErrors.Unauthorized('Password cannot be same as previous password!');
        }
        await this.credentials(user.id).patch({
            password: await bcrypt.hash(newPassword, this.saltRounds),
        });
        return user;
    }
};
UserRepository = __decorate([
    __param(0, core_1.inject('datasources.pgdb')),
    __param(1, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    __param(2, repository_1.repository.getter('UserCredentialsRepository')),
    __metadata("design:paramtypes", [datasources_1.PgdbDataSource, Function, Function])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map