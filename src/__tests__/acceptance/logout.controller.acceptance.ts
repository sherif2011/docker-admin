import {Client} from '@loopback/testlab';
import {Loopback4StarterApplication} from '../..';
import {setupApplication} from './test-helper';
let login = require('./login.controller.acceptance');

describe('Logout Controller', () => {
  let app: Loopback4StarterApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('logout super admin', async () => {
    await client
      .post('/logout/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + login.tokenDetails.accessToken)
      .expect(200);
  });
});
