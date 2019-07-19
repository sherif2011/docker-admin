import { Loopback4StarterApplication } from '../..';
import { Client } from '@loopback/testlab';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: Loopback4StarterApplication;
    client: Client;
}
