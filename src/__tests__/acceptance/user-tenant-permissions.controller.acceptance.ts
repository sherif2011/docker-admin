import {Client} from '@loopback/testlab';
import {Loopback4StarterApplication} from '../..';
import {setupApplication} from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('User-Tenant Permissions Controller', () => {
  let app: Loopback4StarterApplication;
  let client: Client;

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
    ({app, client} = await setupApplication());
    tokenDetails = await loginDetails.login(client);
  });

  it('get user-tenant permissions', async () => {
    await client
      .get('/user-tenant-permissions/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('get user-tenant permissions count', async () => {
    await client
      .get('/user-tenant-permissions/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('post user-tenant permissions', async () => {
    await client
      .post('/user-tenant-permissions/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantPermissionsDetails)
      .expect(200);
  });

  it('delete user-tenant permissions by id', async () => {
    await client
      .delete('/user-tenant-permissions/1/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  it('put user-tenant permissions by id', async () => {
    await client
      .put('/user-tenant-permissions/1')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantPermissionsDetails)
      .expect(204);
  });

  it('get user-tenant permissions by id', async () => {
    await client
      .get('/user-tenant-permissions/1/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch user-tenant permissions by id', async () => {
    await client
      .patch('/user-tenant-permissions/1/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantPermissionsDetails)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
