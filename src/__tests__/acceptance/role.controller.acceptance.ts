import {Client} from '@loopback/testlab';
import {Loopback4StarterApplication} from '../..';
import {setupApplication} from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('Role Controller', () => {
  let app: Loopback4StarterApplication;
  let client: Client;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let roleDetails = {
    deleted: false,
    name: 'test-role',
    permissions: ['permission1', 'permission2', 'permission3'],
    roleKey: 10,
  };

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    tokenDetails = await loginDetails.login(client);
    //console.log(tokenDetails);
  });

  it('get roles', async () => {
    await client
      .get('/roles/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('post roles', async () => {
    await client
      .post('/roles/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(roleDetails)
      .expect(200);
  });

  it('get roles count', async () => {
    await client
      .get('/roles/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  // it('put roles by id', async () => {
  //   await client
  //     .put('/roles/10/')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .send(roleDetails)
  //     .expect(204);
  // });

  // it('get role by id', async () => {
  //   await client
  //     .get('/roles/10/')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .expect(200);
  // });

  // it('patch role by id', async () => {
  //   await client
  //     .patch('/roles/10/')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .send(roleDetails)
  //     .expect(204);
  // });

  // it('delete role by id', async () => {
  //   await client
  //     .delete('/roles/10/')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .expect(204);
  // });

  after(async () => {
    await app.stop();
  });
});
