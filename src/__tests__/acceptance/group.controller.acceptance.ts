import {Client} from '@loopback/testlab';
import {Loopback4StarterApplication} from '../..';
import {setupApplication} from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('Group Controller', () => {
  let app: Loopback4StarterApplication;
  let client: Client;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let groupDetails = {
    deleted: false,
    name: 'test-group',
    clients: ['client1', 'client2', 'client3'],
  };

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    tokenDetails = await loginDetails.login(client);
    //console.log(tokenDetails);
  });

  it('get groups', async () => {
    await client
      .get('/groups/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('post groups', async () => {
    await client
      .post('/groups/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(groupDetails)
      .expect(200);
  });

  it('get groups count', async () => {
    await client
      .get('/groups/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  // it('put group by id', async () => {
  //   await client
  //     .put('/groups/2/')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .send(groupDetails)
  //     .expect(204);
  // });

  // it('get group by id', async () => {
  //   await client
  //     .get('/groups/2/')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .expect(200);
  // });

  // it('patch group by id', async () => {
  //   await client
  //     .patch('/groups/2/')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .send(groupDetails)
  //     .expect(204);
  // });

  // it('delete group by id', async () => {
  //   await client
  //     .delete('/groups/2/')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .expect(204);
  // });

  after(async () => {
    await app.stop();
  });
});
