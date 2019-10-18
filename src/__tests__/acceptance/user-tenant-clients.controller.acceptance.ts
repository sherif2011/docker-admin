import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('User-Tenant Clients Controller', () => {
  let app: adminApplication;
  let client: Client;
  let testUserTenantClientId = 0;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let userTenantClientsDetails = {
    deleted: false,
    userTenantId: 1,
    client: 'AMAC',
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

  it('post user-tenant-clients', async () => {
    await client
      .post('/user-tenant-clients/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantClientsDetails)
      .expect(200);
  });

  it('get user-tenant-clients', async () => {
    await client
      .get('/user-tenant-clients?filter[where][userTenantId]=1')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200)
      .expect(function (res) {
        testUserTenantClientId = res.body[0].id;
      });
  });

  it('get user-tenant-clients count', async () => {
    await client
      .get('/user-tenant-clients/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('put user-tenant-client by id', async () => {
    await client
      .put('/user-tenant-clients/' + testUserTenantClientId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantClientsDetails)
      .expect(204);
  });

  it('get user-tenant-client by id', async () => {
    await client
      .get('/user-tenant-clients/' + testUserTenantClientId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch user-tenant-client by id', async () => {
    await client
      .patch('/user-tenant-clients/' + testUserTenantClientId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userTenantClientsDetails)
      .expect(204);
  });

  it('delete user-tenant-client by id', async () => {
    await client
      .delete('/user-tenant-clients/' + testUserTenantClientId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
