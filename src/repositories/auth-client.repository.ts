import { inject } from '@loopback/core';

import { PgdbDataSource } from '../datasources';
import { AuthClient } from '../models';
import { DefaultCrudRepository } from '@loopback/repository';

export class AuthClientRepository extends DefaultCrudRepository<
  AuthClient,
  typeof AuthClient.prototype.id
  > {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(AuthClient, dataSource);
  }
}
