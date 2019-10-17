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
  Group,
} from '../models';
import { UserTenantRepository } from '../repositories';
import { authorize } from 'loopback4-authorization';

export class UserTenantGroupController {
  constructor(
    @repository(UserTenantRepository)
    public userTenantRepository: UserTenantRepository,
  ) { }

  @authorize(['*'])
  @get('/user-tenants/{id}/group', {
    responses: {
      '200': {
        description: 'Group belonging to UserTenant',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Group) },
          },
        },
      },
    },
  })
  async getGroup(
    @param.path.number('id') id: typeof UserTenant.prototype.id,
  ): Promise<Group> {
    return this.userTenantRepository.group(id);
  }
}
