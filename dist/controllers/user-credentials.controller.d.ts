import { UserRepository } from '../repositories/';
import { User, UserCredentials } from '../models/';
export declare class UserCredentialsController {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    createAccount(userId: typeof User.prototype.id, credentails: UserCredentials): Promise<UserCredentials>;
}
