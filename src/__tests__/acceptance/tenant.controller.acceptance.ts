import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('Tenant Controller', () => {
  let app: adminApplication;
  let client: Client;
  let testTenantId = 0;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let tenantDetails = {
    deleted: false,
    name: 'test-tenant',
    type: 'customer',
    address1: '20130 Lakeview Center Plaza',
    address2: 'Suite 300',
    address3: '',
    address4: '',
    city: 'Ashburn',
    state: 'VA',
    zip: '20147',
    country: 'Loudon',
    status: 'active',
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
    tokenDetails = await loginDetails.login(client);
    //console.log(tokenDetails);
  });

  it('post tenants', async () => {
    await client
      .post('/tenants/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(tenantDetails)
      .expect(200);
  });

  it('get tenants', async () => {
    await client
      .get('/tenants?filter[where][name]=test-tenant')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200)
      .expect(function (res) {
        testTenantId = res.body[0].id;
      });
  });

  it('get tenants count', async () => {
    await client
      .get('/tenants/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('put tenant by id', async () => {
    await client
      .put('/tenants/' + testTenantId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(tenantDetails)
      .expect(204);
  });

  it('get tenant by id', async () => {
    await client
      .get('/tenants/' + testTenantId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch tenant by id', async () => {
    await client
      .patch('/tenants/' + testTenantId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(tenantDetails)
      .expect(204);
  });

  it('delete tenant by id', async () => {
    await client
      .delete('/tenants/' + testTenantId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
