import { Client } from '@loopback/testlab';
import { adminApplication } from '../..';
import { setupApplication } from './test-helper';

describe('Login/Out Controllers', () => {
  let app: adminApplication;
  let client: Client;
  let loginDetails = {
    client_id: 'l2app',
    client_secret: 'qiweu12!@',
    username: 'super_admin',
    password: 'test123!@#',
  };

  let authDetails = {
    code: '',
    clientId: 'l2app',
    username: 'super_admin',
  };

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  let refreshDetails = {
    refreshToken: '',
  };

  let resetDetails = {
    userId: 1,
    authProvider: 'internal',
    password: 'Hello@123',
  };

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('login as super_admin', async () => {
    await client
      .post('/auth/login/')
      .set('Accept', 'application/json')
      .send(loginDetails)
      .expect(200)
      .expect(function (res) {
        authDetails.code = res.body.code.trim();
      });
  });

  it('retrieve access token', async () => {
    await client
      .post('/auth/token/')
      .set('Accept', 'application/json')
      .send(authDetails)
      .expect(function (res) {
        tokenDetails = res.body;
      })
      .expect(200);
  });

  it('refresh access token', async () => {
    refreshDetails.refreshToken = tokenDetails.refreshToken;
    await client
      .post('/auth/token-refresh/')
      .set('Accept', 'application/json')
      .send(refreshDetails)
      .expect(200)
      .expect(function (res) {
        tokenDetails = res.body;
      });
  });

  it('reset super admin password', async () => {
    await client
      .post('/users/1/credentials/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(resetDetails)
      .expect(200);
  });

  it('set password back', async () => {
    resetDetails.password = 'test123!@#';
    await client
      .post('/users/1/credentials/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
      .send(resetDetails)
      .expect(200);
  });

  // it('logout super admin', async () => {
  //   await client
  //     .post('/logout/')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', 'Bearer ' + tokenDetails.accessToken)
  //     .expect(200);
  // });
});

exports.login = async function (client: Client) {
  let loginDetails = {
    client_id: 'l2app',
    client_secret: 'qiweu12!@',
    username: 'super_admin',
    password: 'test123!@#',
  };

  let authDetails = {
    code: '',
    clientId: 'l2app',
    username: 'super_admin',
  };

  let tokenDetails = {
    accessToken: '',
    refreshToken: '',
  };

  await client
    .post('/auth/login/')
    .set('Accept', 'application/json')
    .send(loginDetails)
    .expect(200)
    .expect(function (res) {
      authDetails.code = res.body.code.trim();
    });

  await client
    .post('/auth/token/')
    .set('Accept', 'application/json')
    .send(authDetails)
    .expect(200)
    .expect(function (res) {
      tokenDetails = res.body;
    });

  return tokenDetails;
};
