import {model, property} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';

@model({
  name: 'groups',
})
export class Group extends BaseEntity {
  @property({
    type: 'number',
    id: true,
    required: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  clients: string[];

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group;
