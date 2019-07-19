import { DefaultCrudRepository } from '@loopback/repository';
import { UserTenantPermission, UserTenantPermissionRelations } from '../models';
import { PgdbDataSource } from '../datasources';
export declare class UserTenantPermissionRepository extends DefaultCrudRepository<UserTenantPermission, typeof UserTenantPermission.prototype.id, UserTenantPermissionRelations> {
    constructor(dataSource: PgdbDataSource);
}
