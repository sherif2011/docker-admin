import { PgdbDataSource } from '../datasources';
import { UserCredentials, UserCredentialsRelations } from '../models';
import { DefaultCrudRepository } from '@loopback/repository';
export declare class UserCredentialsRepository extends DefaultCrudRepository<UserCredentials, typeof UserCredentials.prototype.id, UserCredentialsRelations> {
    constructor(dataSource: PgdbDataSource);
}
