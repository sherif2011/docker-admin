import { Count, Filter, Where } from '@loopback/repository';
import { Group } from '../models';
import { GroupRepository } from '../repositories';
export declare class GroupController {
    groupRepository: GroupRepository;
    constructor(groupRepository: GroupRepository);
    create(group: Group): Promise<Group>;
    count(where?: Where<Group>): Promise<Count>;
    find(filter?: Filter<Group>): Promise<Group[]>;
    updateAll(group: Group, where?: Where<Group>): Promise<Count>;
    findById(id: number): Promise<Group>;
    updateById(id: number, group: Group): Promise<void>;
    replaceById(id: number, group: Group): Promise<void>;
    deleteById(id: number): Promise<void>;
}
