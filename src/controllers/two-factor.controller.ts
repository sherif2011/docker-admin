// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


import { Request, RestBindings, get, ResponseObject, param } from '@loopback/rest';
import { inject } from '@loopback/context';
import { authorize } from 'loopback4-authorization';
import { UserRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { RequestIdRepository } from '../repositories/request-id.repository';
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'XXXXXXX',
  apiSecret: 'XXXXXXXXXXXXX',
});

// const util = require('util');

// const NexmoVerify = util.promisify(nexmo.verify.request);
/**
 * OpenAPI response for ping()
 */
const TWOFACTOR_RESPONSE: ResponseObject = {
  description: 'Two Factor - Request Code - Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          RequestId: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

const TWOFACTOR_VERIFY_RESPONSE: ResponseObject = {
  description: 'Two Factor - Verify Code - Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          result: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class TwoFactorController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(RequestIdRepository) private requestIdRepository: RequestIdRepository, ) { }

  // Map to `GET /ping`
  @authorize(['*'])
  @get('/Send2FA/{username}', {
    responses: {
      '200': TWOFACTOR_RESPONSE,
    },
  })
  async send2fa(@param.path.string('username') username: string): Promise<object> {
    let user = await this.userRepository.findOne({ where: { username: username } });

    if (user == null || user == undefined)
      return {
        Message: 'Unkown username',
        date: new Date(),
        url: this.req.url,
        headers: Object.assign({}, this.req.headers),
      };

    if (user['phone'] == null || user['phone'] == undefined)
      return {
        Message: 'Missing Phone Number',
        date: new Date(),
        url: this.req.url,
        headers: Object.assign({}, this.req.headers),
      };

    let phone = '1' + user['phone'];
    let guserName = user.username;

    await this.requestIdRepository.deleteById(guserName).catch(e => { });

    await nexmo.verify.request({
      number: phone,
      brand: 'SD-360',
      code_length: '6'
    }, async (err: any, result: any) => {
      if (err != null)
        return {
          Message: err,
          date: new Date(),
          url: this.req.url,
          headers: Object.assign({}, this.req.headers),
        };

      if (result != null) {
        await this.requestIdRepository.create({ username: guserName, requestId: result.request_id });
        return {
          Message: 'Code Successfully Sent',
          date: new Date(),
          url: this.req.url,
          headers: Object.assign({}, this.req.headers),
        };
      }
    })

    return {
      Message: 'Code Sent',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };;
  }

  @authorize(['*'])
  @get('/Verify2FA/{username}/{code}', {
    responses: {
      '200': TWOFACTOR_RESPONSE,
    },
  })
  async verify2fa(@param.path.string('username') username: string,
    @param.path.string('code') code: string
  ): Promise<object> {
    let user = await this.requestIdRepository.findOne({ where: { username: username } });

    if (user == null || user == undefined)
      return {
        Message: 'Request was not initiated',
        date: new Date(),
        url: this.req.url,
        headers: Object.assign({}, this.req.headers),
      };

    await nexmo.verify.check({
      request_id: user.requestId,
      code: code
    }, (err: any, result: any) => {
      if (result != null)
        return {
          Message: result,
          date: new Date(),
          url: this.req.url,
          headers: Object.assign({}, this.req.headers),
        };
    });

    return {
      Message: 'need to switch to promise resolve/deny',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}




