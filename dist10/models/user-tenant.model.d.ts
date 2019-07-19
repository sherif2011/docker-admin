import { BaseEntity } from './base-entity.model';
import { TenantWithRelations } from './tenant.model';
import { UserWithRelations } from './user.model';
import { RoleWithRelations } from './role.model';
import { GroupWithRelations } from './group.model';
export declare class UserTenant extends BaseEntity {
    id?: number;
    userId: number;
    tenantId: number;
    roleId: number;
    groupId: number;
    status: string;
    constructor(data?: Partial<UserTenant>);
}
export interface UserTenantRelations {
    user: UserWithRelations;
    tenant: TenantWithRelations;
    role: RoleWithRelations;
    group: GroupWithRelations;
}
export declare type UserTenantWithRelations = UserTenant & UserTenantRelations;
