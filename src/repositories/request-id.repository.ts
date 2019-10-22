import { DefaultCrudRepository } from '@loopback/repository';
import { RequestId, RequestIdRelations } from '../models/request-id.model';
import { PgdbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RequestIdRepository extends DefaultCrudRepository<
  RequestId,
  typeof RequestId.prototype.username,
  RequestIdRelations
  > {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(RequestId, dataSource);
  }
}
