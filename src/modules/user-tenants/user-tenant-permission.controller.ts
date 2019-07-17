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
import {UserTenantPermission} from '../../models';
import {UserTenantPermissionRepository} from '../../repositories';

export class UserTenantPermissionController {
  constructor(
    @repository(UserTenantPermissionRepository)
    public userTenantPermissionRepository: UserTenantPermissionRepository,
  ) {}

  @post('/user-tenant-permissions', {
    responses: {
      '200': {
        description: 'UserTenantPermission model instance',
        content: {
          'application/json': {schema: {'x-ts-type': UserTenantPermission}},
        },
      },
    },
  })
  async create(
    @requestBody() userTenantPermission: UserTenantPermission,
  ): Promise<UserTenantPermission> {
    return await this.userTenantPermissionRepository.create(
      userTenantPermission,
    );
  }

  @get('/user-tenant-permissions/count', {
    responses: {
      '200': {
        description: 'UserTenantPermission model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserTenantPermission))
    where?: Where<UserTenantPermission>,
  ): Promise<Count> {
    return await this.userTenantPermissionRepository.count(where);
  }

  @get('/user-tenant-permissions', {
    responses: {
      '200': {
        description: 'Array of UserTenantPermission model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': UserTenantPermission}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserTenantPermission))
    filter?: Filter<UserTenantPermission>,
  ): Promise<UserTenantPermission[]> {
    return await this.userTenantPermissionRepository.find(filter);
  }

  @patch('/user-tenant-permissions', {
    responses: {
      '200': {
        description: 'UserTenantPermission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTenantPermission, {partial: true}),
        },
      },
    })
    userTenantPermission: UserTenantPermission,
    @param.query.object('where', getWhereSchemaFor(UserTenantPermission))
    where?: Where<UserTenantPermission>,
  ): Promise<Count> {
    return await this.userTenantPermissionRepository.updateAll(
      userTenantPermission,
      where,
    );
  }

  @get('/user-tenant-permissions/{id}', {
    responses: {
      '200': {
        description: 'UserTenantPermission model instance',
        content: {
          'application/json': {schema: {'x-ts-type': UserTenantPermission}},
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<UserTenantPermission> {
    return await this.userTenantPermissionRepository.findById(id);
  }

  @patch('/user-tenant-permissions/{id}', {
    responses: {
      '204': {
        description: 'UserTenantPermission PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTenantPermission, {partial: true}),
        },
      },
    })
    userTenantPermission: UserTenantPermission,
  ): Promise<void> {
    await this.userTenantPermissionRepository.updateById(
      id,
      userTenantPermission,
    );
  }

  @put('/user-tenant-permissions/{id}', {
    responses: {
      '204': {
        description: 'UserTenantPermission PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userTenantPermission: UserTenantPermission,
  ): Promise<void> {
    await this.userTenantPermissionRepository.replaceById(
      id,
      userTenantPermission,
    );
  }

  @del('/user-tenant-permissions/{id}', {
    responses: {
      '204': {
        description: 'UserTenantPermission DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userTenantPermissionRepository.deleteById(id);
  }
}
