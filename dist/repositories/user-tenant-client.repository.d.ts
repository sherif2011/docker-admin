import { DefaultCrudRepository } from '@loopback/repository';
import { UserTenantClient, UserTenantClientRelations } from '../models';
import { PgdbDataSource } from '../datasources';
export declare class UserTenantClientRepository extends DefaultCrudRepository<UserTenantClient, typeof UserTenantClient.prototype.id, UserTenantClientRelations> {
    constructor(dataSource: PgdbDataSource);
}
