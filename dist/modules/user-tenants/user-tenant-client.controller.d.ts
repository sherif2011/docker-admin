import { Count, Filter, Where } from '@loopback/repository';
import { UserTenantClient } from '../../models';
import { UserTenantClientRepository } from '../../repositories';
export declare class UserTenantClientController {
    userTenantClientRepository: UserTenantClientRepository;
    constructor(userTenantClientRepository: UserTenantClientRepository);
    create(userTenantClient: UserTenantClient): Promise<UserTenantClient>;
    count(where?: Where<UserTenantClient>): Promise<Count>;
    find(filter?: Filter<UserTenantClient>): Promise<UserTenantClient[]>;
    updateAll(userTenantClient: UserTenantClient, where?: Where<UserTenantClient>): Promise<Count>;
    findById(id: number): Promise<UserTenantClient>;
    updateById(id: number, userTenantClient: UserTenantClient): Promise<void>;
    replaceById(id: number, userTenantClient: UserTenantClient): Promise<void>;
    deleteById(id: number): Promise<void>;
}
