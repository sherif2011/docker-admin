import {post, param, requestBody} from '@loopback/rest';
import {UserRepository} from '../../repositories';
import {User, UserCredentials} from '../../models';
import {repository} from '@loopback/repository';

export class UserCredentialsController {
  constructor(
    @repository(UserRepository)
    protected userRepository: UserRepository,
  ) {}

  @post('/users/{id}/credentials')
  async createAccount(
    @param.path.number('id') userId: typeof User.prototype.id,
    @requestBody() credentials: UserCredentials,
  ): Promise<UserCredentials> {
    return await this.userRepository.credentials(userId).create(credentials);
  }
}
