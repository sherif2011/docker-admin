import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('User-Tenant Permissions Controller', () => {
  let app: adminApplication;
  let client: Client;
  let testUserTenantPermissionsId = 0

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let userTenantPermissionsDetails = {
    deleted: false,
    userTenantId: 1,
    permission: 'PermissionTest',
    allowed: false,
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
    tokenDetails = await loginDetails.login(client);
  });

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
    tokenDetails = await loginDetails.login(client);
    //console.log(tokenDetails);
  });

  it('post user-tenant-permissions', async () => {
    await client
      .post('/user-tenant-permissions/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantPermissionsDetails)
      .expect(200);
  });

  it('get user-tenant-permissions', async () => {
    await client
      .get('/user-tenant-permissions?filter[where][userTenantId]=1')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200)
      .expect(function (res) {
        testUserTenantPermissionsId = res.body[0].id;
      });
  });

  it('get user-tenant-permissions count', async () => {
    await client
      .get('/user-tenant-permissions/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('put user-tenant-client by id', async () => {
    await client
      .put('/user-tenant-permissions/' + testUserTenantPermissionsId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantPermissionsDetails)
      .expect(204);
  });

  it('get user-tenant-client by id', async () => {
    await client
      .get('/user-tenant-permissions/' + testUserTenantPermissionsId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch user-tenant-client by id', async () => {
    await client
      .patch('/user-tenant-permissions/' + testUserTenantPermissionsId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantPermissionsDetails)
      .expect(204);
  });

  it('delete user-tenant-client by id', async () => {
    await client
      .delete('/user-tenant-permissions/' + testUserTenantPermissionsId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });
  after(async () => {
    await app.stop();
  });
});
