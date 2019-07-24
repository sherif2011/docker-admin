import {inject} from '@loopback/core';

import {PgdbDataSource} from '../datasources';
import {UserCredentials, UserCredentialsRelations} from '../models';
import {DefaultCrudRepository} from '@loopback/repository';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(UserCredentials, dataSource);
  }
}
