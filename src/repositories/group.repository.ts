import { DataObject, Options, DefaultCrudRepository } from '@loopback/repository';
import { Group, GroupRelations } from '../models';
import { PgdbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
  > {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Group, dataSource);
  }

  async create(entity: DataObject<Group>, options?: Options): Promise<Group> {
    //const role = await super.create(entity, options);
    const clients = `{${entity.clients ? entity.clients.join() : ''}}`;

    const query = `INSERT INTO admin.groups(
      clients, name, deleted)
      VALUES ('${clients}', '${entity.name}', '${entity.deleted}')`;
    await super.execute(query, []);
    return (await this.findOne({
      order: ['createdOn DESC'],
    })) as Group;
  }

  async updateById(id: number, entity: DataObject<Group>): Promise<void> {
    const clients = `{${entity.clients ? entity.clients.join() : ''}}`;

    const query = `UPDATE admin.groups SET
     clients='${clients}',  name='${entity.name}', deleted='${
      entity.deleted
      }' WHERE id=${id}`;
    await super.execute(query, []);
  }

  async replaceById(id: number, entity: DataObject<Group>): Promise<void> {
    const clients = `{${entity.clients ? entity.clients.join() : ''}}`;

    const query = `UPDATE admin.groups SET
    clients='${clients}',  name='${entity.name}', deleted='${
      entity.deleted
      }' WHERE id=${id}`;
    await super.execute(query, []);
  }
}
