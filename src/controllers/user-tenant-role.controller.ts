import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserTenant,
  Role,
} from '../models';
import { UserTenantRepository } from '../repositories';
import { STRATEGY, authenticate } from 'loopback4-authentication';
import { authorize } from 'loopback4-authorization';

export class UserTenantRoleController {
  constructor(
    @repository(UserTenantRepository)
    public userTenantRepository: UserTenantRepository,
  ) { }

  @authorize(['*'])
  @get('/user-tenants/{id}/role', {
    responses: {
      '200': {
        description: 'Role belonging to UserTenant',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Role) },
          },
        },
      },
    },
  })
  async getRole(
    @param.path.number('id') id: typeof UserTenant.prototype.id,
  ): Promise<Role> {
    return this.userTenantRepository.role(id);
  }
}
