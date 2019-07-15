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
import {UserCredentials} from '../../models';
import {UserCredentialsRepository} from '../../repositories';
import {authorize} from 'loopback4-authorization';

export class UserCredentialsController {
  constructor(
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
  ) {}

  @authorize(['*'])
  @post('/user-credentials', {
    responses: {
      '200': {
        description: 'UserCredentials model instance',
        content: {'application/json': {schema: {'x-ts-type': UserCredentials}}},
      },
    },
  })
  async create(
    @requestBody() userCredentials: UserCredentials,
  ): Promise<UserCredentials> {
    return await this.userCredentialsRepository.create(userCredentials);
  }

  @authorize(['*'])
  @get('/user-credentials/count', {
    responses: {
      '200': {
        description: 'UserCredentials model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserCredentials))
    where?: Where<UserCredentials>,
  ): Promise<Count> {
    return await this.userCredentialsRepository.count(where);
  }

  @authorize(['*'])
  @get('/user-credentials', {
    responses: {
      '200': {
        description: 'Array of UserCredentials model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': UserCredentials}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserCredentials))
    filter?: Filter<UserCredentials>,
  ): Promise<UserCredentials[]> {
    return await this.userCredentialsRepository.find(filter);
  }

  @authorize(['*'])
  @patch('/user-credentials', {
    responses: {
      '200': {
        description: 'UserCredentials PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {partial: true}),
        },
      },
    })
    userCredentials: UserCredentials,
    @param.query.object('where', getWhereSchemaFor(UserCredentials))
    where?: Where<UserCredentials>,
  ): Promise<Count> {
    return await this.userCredentialsRepository.updateAll(
      userCredentials,
      where,
    );
  }

  @authorize(['*'])
  @get('/user-credentials/{id}', {
    responses: {
      '200': {
        description: 'UserCredentials model instance',
        content: {'application/json': {schema: {'x-ts-type': UserCredentials}}},
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<UserCredentials> {
    return await this.userCredentialsRepository.findById(id);
  }

  @authorize(['*'])
  @patch('/user-credentials/{id}', {
    responses: {
      '204': {
        description: 'UserCredentials PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentials, {partial: true}),
        },
      },
    })
    userCredentials: UserCredentials,
  ): Promise<void> {
    await this.userCredentialsRepository.updateById(id, userCredentials);
  }

  @authorize(['*'])
  @put('/user-credentials/{id}', {
    responses: {
      '204': {
        description: 'UserCredentials PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userCredentials: UserCredentials,
  ): Promise<void> {
    await this.userCredentialsRepository.replaceById(id, userCredentials);
  }

  @authorize(['*'])
  @del('/user-credentials/{id}', {
    responses: {
      '204': {
        description: 'UserCredentials DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userCredentialsRepository.deleteById(id);
  }
}
