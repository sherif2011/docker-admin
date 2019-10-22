import { Entity, model, property } from '@loopback/repository';

@model()
export class RequestId extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    generated: false,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    name: 'request_id'
  })
  requestId: string;


  constructor(data?: Partial<RequestId>) {
    super(data);
  }
}

export interface RequestIdRelations {
  // describe navigational properties here
}

export type RequestIdWithRelations = RequestId & RequestIdRelations;
