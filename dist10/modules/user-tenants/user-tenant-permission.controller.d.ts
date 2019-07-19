import { Count, Filter, Where } from '@loopback/repository';
import { UserTenantPermission } from '../../models';
import { UserTenantPermissionRepository } from '../../repositories';
export declare class UserTenantPermissionController {
    userTenantPermissionRepository: UserTenantPermissionRepository;
    constructor(userTenantPermissionRepository: UserTenantPermissionRepository);
    create(userTenantPermission: UserTenantPermission): Promise<UserTenantPermission>;
    count(where?: Where<UserTenantPermission>): Promise<Count>;
    find(filter?: Filter<UserTenantPermission>): Promise<UserTenantPermission[]>;
    updateAll(userTenantPermission: UserTenantPermission, where?: Where<UserTenantPermission>): Promise<Count>;
    findById(id: number): Promise<UserTenantPermission>;
    updateById(id: number, userTenantPermission: UserTenantPermission): Promise<void>;
    replaceById(id: number, userTenantPermission: UserTenantPermission): Promise<void>;
    deleteById(id: number): Promise<void>;
}
