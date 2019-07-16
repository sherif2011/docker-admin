import {DefaultCrudRepository} from '@loopback/repository';
import {UserTenantClient, UserTenantClientRelations} from '../models';
import {PgdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserTenantClientRepository extends DefaultCrudRepository<
  UserTenantClient,
  typeof UserTenantClient.prototype.id,
  UserTenantClientRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(UserTenantClient, dataSource);
  }
}
