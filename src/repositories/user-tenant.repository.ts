import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, repository, DefaultCrudRepository } from '@loopback/repository';

import { PgdbDataSource } from '../datasources';
import {
  Tenant,
  User,
  UserTenant,
  UserTenantRelations, Group, Role
} from '../models';
import { TenantRepository } from './tenant.repository';
import { UserRepository } from './user.repository';
import { GroupRepository } from './group.repository';
import { RoleRepository } from './role.repository';

export class UserTenantRepository extends DefaultCrudRepository<
  UserTenant,
  typeof UserTenant.prototype.id,
  UserTenantRelations
  > {
  public readonly tenant: BelongsToAccessor<
    Tenant,
    typeof UserTenant.prototype.id
  >;

  public readonly user: BelongsToAccessor<User, typeof UserTenant.prototype.id>;

  public readonly group: BelongsToAccessor<Group, typeof UserTenant.prototype.id>;

  public readonly role: BelongsToAccessor<Role, typeof UserTenant.prototype.id>;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter(TenantRepository)
    tenantRepositoryGetter: Getter<TenantRepository>,
    @repository.getter(UserRepository)
    userRepositoryGetter: Getter<UserRepository>, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,

  ) {
    super(UserTenant, dataSource);
    this.role = this.createBelongsToAccessorFor('Role', roleRepositoryGetter);
    this.group = this.createBelongsToAccessorFor('Group', groupRepositoryGetter);

    this.tenant = this.createBelongsToAccessorFor(
      'tenant_id',
      tenantRepositoryGetter,
    );

    this.user = this.createBelongsToAccessorFor(
      'user_id',
      userRepositoryGetter,
    );
  }
}

