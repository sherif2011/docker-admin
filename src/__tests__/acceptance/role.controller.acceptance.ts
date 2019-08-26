import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('Role Controller', () => {
  let app: adminApplication;
  let client: Client;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let roleDetails = {
    deleted: false,
    name: 'test-group',
    permissions: ['client1', 'client2', 'client3'],
    roleKey: 0,
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
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

  it('get roles count', async () => {
    await client
      .get('/roles/count')
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

  it('delete role by id', async () => {
    await client
      .delete('/roles/4/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  it('put roles by id', async () => {
    await client
      .put('/roles/4/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(roleDetails)
      .expect(204);
  });

  it('get role by id', async () => {
    await client
      .get('/roles/4/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch role by id', async () => {
    await client
      .patch('/roles/4/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(roleDetails)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
