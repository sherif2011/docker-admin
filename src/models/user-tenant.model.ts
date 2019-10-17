import { model, property, belongsTo } from '@loopback/repository';
import { BaseEntity } from './base-entity.model';
import { Tenant, TenantWithRelations } from './tenant.model';
import { User, UserWithRelations } from './user.model';
import { Group, GroupWithRelations } from './group.model';
import { Role, RoleWithRelations } from './role.model';

@model({
  name: 'user_tenants',
})
export class UserTenant extends BaseEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @belongsTo(
    () => User,
    { keyFrom: 'user_id', name: 'user_id' },
    {
      name: 'user_id',
      required: true,
    },
  )
  userId: number;

  @belongsTo(
    () => Tenant,
    { keyFrom: 'tenant_id', name: 'tenant_id' },
    {
      name: 'tenant_id',
      required: true,
    },
  )
  tenantId: number;

  @property({
    type: 'string',
    required: true,
    default: 'active',
  })
  status: string;

  @belongsTo(() => Group,
    { keyFrom: 'group_id', name: 'Group' },
    {
      name: 'group_id',
    },
  )
  groupId: number;

  @belongsTo(() => Role,
    { keyFrom: 'role_id', name: 'Role' },
    {
      name: 'role_id',
    },
  )
  roleId: number;

  constructor(data?: Partial<UserTenant>) {
    super(data);
  }
}

export interface UserTenantRelations {
  user: UserWithRelations;
  tenant: TenantWithRelations;
  role: RoleWithRelations;
  group: GroupWithRelations;
}

export type UserTenantWithRelations = UserTenant & UserTenantRelations;
