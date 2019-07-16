import {model, property, belongsTo} from '@loopback/repository';

import {UserModifiableEntity} from './user-modifiable-entity.model';
import {UserTenant, UserTenantWithRelations} from './user-tenant.model';

@model({
  name: 'user_tenant_clients',
})
export class UserTenantClient extends UserModifiableEntity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @belongsTo(
    () => UserTenant,
    {keyFrom: 'user_tenant_id', name: 'user_tenant_id'},
    {
      name: 'user_tenant_id',
      required: true,
    },
  )
  userTenantId: number;

  @property({
    type: 'string',
    required: true,
  })
  client: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  allowed: boolean;

  constructor(data?: Partial<UserTenantClient>) {
    super(data);
  }
}

export interface UserTenantClientRelations {
  userTenant: UserTenantWithRelations;
}

export type UserTenantClientWithRelations = UserTenantClient &
  UserTenantClientRelations;
