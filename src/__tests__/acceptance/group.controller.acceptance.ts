import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

let loginDetails = require('./login.controller.acceptance');

describe('Group Controller', () => {
  let app: adminApplication;
  let client: Client;
  let testGroupId = 0;

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let groupDetails = {
    deleted: false,
    name: 'test-group',
    clients: ['client1', 'client2', 'client3'],
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
    tokenDetails = await loginDetails.login(client);
    //console.log(tokenDetails);
  });

  it('post groups', async () => {
    await client
      .post('/groups/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(groupDetails)
      .expect(200);
  });

  it('get groups', async () => {
    await client
      .get('/groups?filter[where][name]=test-group')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200)
      .expect(function (res) {
        testGroupId = res.body[0].id;
      });
  });

  it('get groups count', async () => {
    await client
      .get('/groups/count')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('put group by id', async () => {
    await client
      .put('/groups/' + testGroupId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(groupDetails)
      .expect(204);
  });

  it('get group by id', async () => {
    await client
      .get('/groups/' + testGroupId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(200);
  });

  it('patch group by id', async () => {
    await client
      .patch('/groups/' + testGroupId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(groupDetails)
      .expect(204);
  });

  it('delete group by id', async () => {
    await client
      .delete('/groups/' + testGroupId)
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .expect(204);
  });

  after(async () => {
    await app.stop();
  });
});
