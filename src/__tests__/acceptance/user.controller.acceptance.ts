import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');
let MankariousId = 0;

describe('User Controller', () => {
  let app: adminApplication;
  let client: Client;
  let testUserId = 0;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let userDetails = {
    deleted: false,
    firstName: 'Sherif',
    lastName: 'Mankarious',
    middleName: 'S',
    username: 'smankarious2',
    email: 'smankarious2@sunrisedataservices.com',
    phone: '777-777-7777',
    defaultTenant: 1,
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
    tokenDetails = await loginDetails.login(client);
  });


  it('post users', async () => {
    await client
      .post('/users/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userDetails)
      .expect(200);
  });

  it('get users', async () => {
    await client
      .get('/users?filter[where][username]=smankarious2')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200)
      .expect(function (res) {
        testUserId = res.body[0].id;
      });
  });

  it('get users count', async () => {
    await client
      .get('/users/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('put user by id', async () => {
    await client
      .put('/users/' + testUserId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userDetails)
      .expect(204);
  });

  it('get user by id', async () => {
    await client
      .get('/users/' + testUserId + '/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch user by id', async () => {
    await client
      .patch('/users/' + testUserId + '/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userDetails)
      .expect(204);
  });

  it('delete user by id', async () => {
    await client
      .delete('/users/' + testUserId + '/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
