import { Tenant, User } from '../../../models';
export declare class AuthUser extends User {
    permissions: string[];
    clients: string[];
    role: string;
    group: string;
    tenant: Tenant;
    externalAuthToken?: string;
    externalRefreshToken?: string;
    constructor(data?: Partial<AuthUser>);
}
