import {UserTenantClient, UserTenantClientRelations} from '../models';
import {PgdbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export class UserTenantClientRepository extends DefaultSoftCrudRepository<
  UserTenantClient,
  typeof UserTenantClient.prototype.id,
  UserTenantClientRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(UserTenantClient, dataSource);
  }
}
