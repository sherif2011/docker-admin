import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('Role Controller', () => {
  let app: adminApplication;
  let client: Client;
  let testRoleId = 0;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let roleDetails = {
    deleted: false,
    name: 'test-role',
    permissions: ['permission1', 'permission2', 'permission3'],
    roleKey: 0,
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
    tokenDetails = await loginDetails.login(client);
    //console.log(tokenDetails);
  });

  it('post roles', async () => {
    await client
      .post('/roles/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(roleDetails)
      .expect(200);
  });

  it('get roles', async () => {
    await client
      .get('/roles?filter[where][name]=test-role')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200)
      .expect(function (res) {
        testRoleId = res.body[0].id;
      });
  });

  it('get roles count', async () => {
    await client
      .get('/roles/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('put role by id', async () => {
    await client
      .put('/roles/' + testRoleId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(roleDetails)
      .expect(204);
  });

  it('get role by id', async () => {
    await client
      .get('/roles/' + testRoleId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch role by id', async () => {
    await client
      .patch('/roles/' + testRoleId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(roleDetails)
      .expect(204);
  });

  it('delete role by id', async () => {
    await client
      .delete('/roles/' + testRoleId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
