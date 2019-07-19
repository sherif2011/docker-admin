import { DefaultCrudRepository, DataObject, Options } from '@loopback/repository';
import { Group, GroupRelations } from '../models';
import { PgdbDataSource } from '../datasources';
export declare class GroupRepository extends DefaultCrudRepository<Group, typeof Group.prototype.id, GroupRelations> {
    constructor(dataSource: PgdbDataSource);
    create(entity: DataObject<Group>, options?: Options): Promise<Group>;
    updateById(id: number, entity: DataObject<Group>): Promise<void>;
    replaceById(id: number, entity: DataObject<Group>): Promise<void>;
}
