import {post, param, requestBody} from '@loopback/rest';
import {UserRepository} from '../../repositories';
import {User, UserCredentials} from '../../models';
import {repository} from '@loopback/repository';
import {authorize} from 'loopback4-authorization';
import * as bcrypt from 'bcrypt';
export class UserCredentialsController {
  constructor(
    @repository(UserRepository)
    protected userRepository: UserRepository,
  ) {}

  @authorize(['*'])
  @post('/users/{id}/credentials')
  async createCredential(
    @param.path.number('id') userId: typeof User.prototype.id,
    @requestBody() credentials: UserCredentials,
  ): Promise<UserCredentials> {
    let saltRounds = 10;
    await this.userRepository.credentials(userId).delete();
    credentials.password = await bcrypt.hash(credentials.password, saltRounds);
    return await this.userRepository.credentials(userId).create(credentials);
  }
}
