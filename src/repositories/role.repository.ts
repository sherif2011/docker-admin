import {inject} from '@loopback/core';

import {PgdbDataSource} from '../datasources';
import {Role} from '../models';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';
import {DataObject, Options} from '@loopback/repository';

export class RoleRepository extends DefaultSoftCrudRepository<
  Role,
  typeof Role.prototype.id
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Role, dataSource);
  }

  async create(entity: DataObject<Role>, options?: Options): Promise<Role> {
    //const role = await super.create(entity, options);
    const permissions = `{${
      entity.permissions ? entity.permissions.join() : ''
    }}`;
    const clients = `{${entity.clients ? entity.clients.join() : ''}}`;

    const query = `INSERT INTO admin.roles(
      permissions, clients, name, deleted, role_key)
      VALUES ('${permissions}', '${clients}', '${entity.name}', '${
      entity.deleted
    }', '${entity.roleKey}')`;
    await super.execute(query, []);
    return (await this.findOne({
      order: ['createdOn DESC'],
    })) as Role;
  }

  async updateById(id: number, entity: DataObject<Role>): Promise<void> {
    const permissions = `{${
      entity.permissions ? entity.permissions.join() : ''
    }}`;
    const clients = `{${entity.clients ? entity.clients.join() : ''}}`;

    const query = `UPDATE admin.roles SET
     permissions='${permissions}', clients= '${clients}', name='${entity.name}',
     deleted='${entity.deleted}',role_key='${entity.roleKey}' WHERE id=${id}`;
    await super.execute(query, []);
  }

  async replaceById(id: number, entity: DataObject<Role>): Promise<void> {
    const permissions = `{${
      entity.permissions ? entity.permissions.join() : ''
    }}`;
    const clients = `{${entity.clients ? entity.clients.join() : ''}}`;

    const query = `UPDATE admin.roles SET
     permissions='${permissions}', clients= '${clients}', name='${entity.name}',
     deleted='${entity.deleted}',role_key='${entity.roleKey}' WHERE id=${id}`;
    await super.execute(query, []);
  }
}
