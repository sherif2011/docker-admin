import {Client} from '@loopback/testlab';
import {Loopback4StarterApplication} from '../..';
import {setupApplication} from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('User Controller', () => {
  let app: Loopback4StarterApplication;
  let client: Client;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let userDetails = {
    deleted: false,
    firstName: 'Sherif',
    lastName: 'Mankarious',
    middleName: 'S',
    username: 'smankarious',
    email: 'smankarious@sunrisedataservices.com',
    phone: '777-777-7777',
    defaultTenant: 1,
  };

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    tokenDetails = await loginDetails.login(client);
  });

  it('get users', async () => {
    await client
      .get('/users/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('get users count', async () => {
    await client
      .get('/users/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('post users', async () => {
    await client
      .post('/users/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userDetails)
      .expect(200);
  });

  it('delete user by id', async () => {
    await client
      .delete('/users/2/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  it('put user by id', async () => {
    await client
      .put('/users/2')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userDetails)
      .expect(204);
  });

  it('get user by id', async () => {
    await client
      .get('/users/2/')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch user by id', async () => {
    await client
      .patch('/users/2/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(userDetails)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
