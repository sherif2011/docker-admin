import { UserModifiableEntity } from './user-modifiable-entity.model';
import { UserTenantWithRelations } from './user-tenant.model';
export declare class UserTenantClient extends UserModifiableEntity {
    id?: number;
    userTenantId: number;
    client: string;
    allowed: boolean;
    constructor(data?: Partial<UserTenantClient>);
}
export interface UserTenantClientRelations {
    userTenant: UserTenantWithRelations;
}
export declare type UserTenantClientWithRelations = UserTenantClient & UserTenantClientRelations;
