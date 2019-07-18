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
import {UserTenantClient} from '../../models';
import {UserTenantClientRepository} from '../../repositories';
import {authorize} from 'loopback4-authorization';

export class UserTenantClientController {
  constructor(
    @repository(UserTenantClientRepository)
    public userTenantClientRepository: UserTenantClientRepository,
  ) {}

  @authorize(['*'])
  @post('/user-tenant-clients', {
    responses: {
      '200': {
        description: 'UserTenantClient model instance',
        content: {
          'application/json': {schema: {'x-ts-type': UserTenantClient}},
        },
      },
    },
  })
  async create(
    @requestBody() userTenantClient: UserTenantClient,
  ): Promise<UserTenantClient> {
    return await this.userTenantClientRepository.create(userTenantClient);
  }

  @authorize(['*'])
  @get('/user-tenant-clients/count', {
    responses: {
      '200': {
        description: 'UserTenantClient model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserTenantClient))
    where?: Where<UserTenantClient>,
  ): Promise<Count> {
    return await this.userTenantClientRepository.count(where);
  }

  @authorize(['*'])
  @get('/user-tenant-clients', {
    responses: {
      '200': {
        description: 'Array of UserTenantClient model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': UserTenantClient}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserTenantClient))
    filter?: Filter<UserTenantClient>,
  ): Promise<UserTenantClient[]> {
    return await this.userTenantClientRepository.find(filter);
  }

  @authorize(['*'])
  @patch('/user-tenant-clients', {
    responses: {
      '200': {
        description: 'UserTenantClient PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTenantClient, {partial: true}),
        },
      },
    })
    userTenantClient: UserTenantClient,
    @param.query.object('where', getWhereSchemaFor(UserTenantClient))
    where?: Where<UserTenantClient>,
  ): Promise<Count> {
    return await this.userTenantClientRepository.updateAll(
      userTenantClient,
      where,
    );
  }

  @authorize(['*'])
  @get('/user-tenant-clients/{id}', {
    responses: {
      '200': {
        description: 'UserTenantClient model instance',
        content: {
          'application/json': {schema: {'x-ts-type': UserTenantClient}},
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<UserTenantClient> {
    return await this.userTenantClientRepository.findById(id);
  }

  @authorize(['*'])
  @patch('/user-tenant-clients/{id}', {
    responses: {
      '204': {
        description: 'UserTenantClient PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTenantClient, {partial: true}),
        },
      },
    })
    userTenantClient: UserTenantClient,
  ): Promise<void> {
    await this.userTenantClientRepository.updateById(id, userTenantClient);
  }

  @authorize(['*'])
  @put('/user-tenant-clients/{id}', {
    responses: {
      '204': {
        description: 'UserTenantClient PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userTenantClient: UserTenantClient,
  ): Promise<void> {
    await this.userTenantClientRepository.replaceById(id, userTenantClient);
  }

  @authorize(['*'])
  @del('/user-tenant-clients/{id}', {
    responses: {
      '204': {
        description: 'UserTenantClient DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userTenantClientRepository.deleteById(id);
  }
}
