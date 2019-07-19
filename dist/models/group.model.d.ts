import { BaseEntity } from './base-entity.model';
export declare class Group extends BaseEntity {
    id?: number;
    name: string;
    clients: string[];
    constructor(data?: Partial<Group>);
}
export interface GroupRelations {
}
export declare type GroupWithRelations = Group;
