import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('User-Tenant Controller', () => {
  let app: adminApplication;
  let client: Client;
  let testUserTenantId = 0;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let userTenantDetails = {
    deleted: false,
    status: 'active',
    userId: 1,
    tenantId: 1,
    groupId: 1,
    roleId: 3
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
    tokenDetails = await loginDetails.login(client);
  });

  // it('post user-tenants', async () => {
  //   await client
  //     .post('/user-tenants/')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .send(userTenantDetails)
  //     .expect(200);
  // });

  it('get user-tenants', async () => {
    await client
      .get('/user-tenants?filter[where][userId]=1')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200)
      .expect(function (res) {
        testUserTenantId = res.body[0].id;
      });
  });

  it('get user-tenants count', async () => {
    await client
      .get('/user-tenants/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('put user-tenants by id', async () => {
    await client
      .put('/user-tenants/' + testUserTenantId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantDetails)
      .expect(204);
  });

  it('get user-tenants by id', async () => {
    await client
      .get('/user-tenants/' + testUserTenantId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch user-tenants by id', async () => {
    await client
      .patch('/user-tenants/' + testUserTenantId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantDetails)
      .expect(204);
  });

  // it('delete user-tenants by id', async () => {
  //   await client
  //     .delete('/user-tenants/' + testUserTenantId)
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .expect(204);
  // });

  after(async () => {
    await app.stop();
  });
});
