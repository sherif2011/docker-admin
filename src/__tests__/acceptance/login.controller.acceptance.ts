import {Client} from '@loopback/testlab';
import {Loopback4StarterApplication} from '../..';
import {setupApplication} from './test-helper';

describe('Login/Out Controllers', () => {
  let app: Loopback4StarterApplication;
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

  exports.tokenDetails = {
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
    ({app, client} = await setupApplication());
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
      .expect(function(res) {
        authDetails.code = res.body.code.trim();
      });
  });

  it('retrieve access token', async () => {
    await client
      .post('/auth/token/')
      .set('Accept', 'application/json')
      .send(authDetails)
      .expect(200)
      .expect(function(res) {
        exports.tokenDetails = res.body;
      });
  });

  it('logout super admin', async () => {
    await client
      .post('/logout/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + exports.tokenDetails.accessToken)
      .expect(200);
  });

  it('re-login as super_admin', async () => {
    await client
      .post('/auth/login/')
      .set('Accept', 'application/json')
      .send(loginDetails)
      .expect(200)
      .expect(function(res) {
        authDetails.code = res.body.code.trim();
      });
  });

  it('retrieve access token', async () => {
    await client
      .post('/auth/token/')
      .set('Accept', 'application/json')
      .send(authDetails)
      .expect(200)
      .expect(function(res) {
        exports.tokenDetails = res.body;
      });
  });

  it('refresh access token', async () => {
    refreshDetails.refreshToken = exports.tokenDetails.refreshToken;
    await client
      .post('/auth/token-refresh/')
      .set('Accept', 'application/json')
      .send(refreshDetails)
      .expect(200)
      .expect(function(res) {
        exports.tokenDetails = res.body;
      });
  });

  it('reset super admin password', async () => {
    await client
      .post('/users/1/credentials/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + exports.tokenDetails.accessToken)
      .send(resetDetails)
      .expect(200);
  });

  it('set password back', async () => {
    resetDetails.password = 'test123!@#';
    await client
      .post('/users/1/credentials/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + exports.tokenDetails.accessToken)
      .send(resetDetails)
      .expect(200);
  });

  it('re-login as super_admin', async () => {
    await client
      .post('/auth/login/')
      .set('Accept', 'application/json')
      .send(loginDetails)
      .expect(200)
      .expect(function(res) {
        authDetails.code = res.body.code.trim();
      });
  });

  it('retrieve access token', async () => {
    await client
      .post('/auth/token/')
      .set('Accept', 'application/json')
      .send(authDetails)
      .expect(200)
      .expect(function(res) {
        exports.tokenDetails = res.body;
      });
  });

  it('refresh access token', async () => {
    refreshDetails.refreshToken = exports.tokenDetails.refreshToken;
    await client
      .post('/auth/token-refresh/')
      .set('Accept', 'application/json')
      .send(refreshDetails)
      .expect(200)
      .expect(function(res) {
        exports.tokenDetails = res.body;
      });
  });
});
