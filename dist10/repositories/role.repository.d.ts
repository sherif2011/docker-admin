import { PgdbDataSource } from '../datasources';
import { Role } from '../models';
import { DefaultSoftCrudRepository } from './default-soft-crud.repository.base';
import { DataObject, Options } from '@loopback/repository';
export declare class RoleRepository extends DefaultSoftCrudRepository<Role, typeof Role.prototype.id> {
    constructor(dataSource: PgdbDataSource);
    create(entity: DataObject<Role>, options?: Options): Promise<Role>;
    updateById(id: number, entity: DataObject<Role>): Promise<void>;
    replaceById(id: number, entity: DataObject<Role>): Promise<void>;
}
