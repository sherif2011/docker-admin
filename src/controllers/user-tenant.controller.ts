import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { UserTenant } from '../models';
import { UserTenantRepository } from '../repositories';
import { authorize } from 'loopback4-authorization';

export class UserTenantController {
  constructor(
    @repository(UserTenantRepository)
    public userTenantRepository: UserTenantRepository,
  ) { }

  @authorize(['*'])
  @post('/user-tenants', {
    responses: {
      '200': {
        description: 'UserTenant model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserTenant) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTenant),
        },
      },
    })
    userTenant: Omit<UserTenant, 'id'>,
  ): Promise<UserTenant> {
    return this.userTenantRepository.create(userTenant);
  }

  @authorize(['*'])
  @get('/user-tenants/count', {
    responses: {
      '200': {
        description: 'UserTenant model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserTenant)) where?: Where<UserTenant>,
  ): Promise<Count> {
    return this.userTenantRepository.count(where);
  }

  @authorize(['*'])
  @get('/user-tenants', {
    responses: {
      '200': {
        description: 'Array of UserTenant model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserTenant) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserTenant)) filter?: Filter<UserTenant>,
  ): Promise<UserTenant[]> {
    return this.userTenantRepository.find(filter);
  }

  @authorize(['*'])
  @patch('/user-tenants', {
    responses: {
      '200': {
        description: 'UserTenant PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTenant, { partial: true }),
        },
      },
    })
    userTenant: UserTenant,
    @param.query.object('where', getWhereSchemaFor(UserTenant)) where?: Where<UserTenant>,
  ): Promise<Count> {
    return this.userTenantRepository.updateAll(userTenant, where);
  }

  @authorize(['*'])
  @get('/user-tenants/{id}', {
    responses: {
      '200': {
        description: 'UserTenant model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserTenant) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<UserTenant> {
    return this.userTenantRepository.findById(id);
  }

  @authorize(['*'])
  @patch('/user-tenants/{id}', {
    responses: {
      '204': {
        description: 'UserTenant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTenant, { partial: true }),
        },
      },
    })
    userTenant: UserTenant,
  ): Promise<void> {
    await this.userTenantRepository.updateById(id, userTenant);
  }

  @authorize(['*'])
  @put('/user-tenants/{id}', {
    responses: {
      '204': {
        description: 'UserTenant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userTenant: UserTenant,
  ): Promise<void> {
    await this.userTenantRepository.replaceById(id, userTenant);
  }

  @authorize(['*'])
  @del('/user-tenants/{id}', {
    responses: {
      '204': {
        description: 'UserTenant DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userTenantRepository.deleteById(id);
  }
}
