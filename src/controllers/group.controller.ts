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
import {Group} from '../models';
import {GroupRepository} from '../repositories';
import {authorize} from 'loopback4-authorization';
import {STRATEGY, authenticate} from 'loopback4-authentication';

export class GroupController {
  constructor(
    @repository(GroupRepository)
    public groupRepository: GroupRepository,
  ) {}

  @authorize(['*'])
  @post('/groups', {
    responses: {
      '200': {
        description: 'Group model instance',
        content: {'application/json': {schema: {'x-ts-type': Group}}},
      },
    },
  })
  async create(@requestBody() group: Group): Promise<Group> {
    return await this.groupRepository.create(group);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @get('/groups/count', {
    responses: {
      '200': {
        description: 'Group model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return await this.groupRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @get('/groups', {
    responses: {
      '200': {
        description: 'Array of Group model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Group}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Group))
    filter?: Filter<Group>,
  ): Promise<Group[]> {
    return await this.groupRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @patch('/groups', {
    responses: {
      '200': {
        description: 'Group PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {partial: true}),
        },
      },
    })
    group: Group,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return await this.groupRepository.updateAll(group, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @get('/groups/{id}', {
    responses: {
      '200': {
        description: 'Group model instance',
        content: {'application/json': {schema: {'x-ts-type': Group}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Group> {
    return await this.groupRepository.findById(id);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @patch('/groups/{id}', {
    responses: {
      '204': {
        description: 'Group PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {partial: true}),
        },
      },
    })
    group: Group,
  ): Promise<void> {
    await this.groupRepository.updateById(id, group);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @put('/groups/{id}', {
    responses: {
      '204': {
        description: 'Group PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() group: Group,
  ): Promise<void> {
    await this.groupRepository.replaceById(id, group);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @del('/groups/{id}', {
    responses: {
      '204': {
        description: 'Group DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.groupRepository.deleteById(id);
  }
}
