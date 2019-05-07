import { Application, jsonApiKoa, KnexProcessor} from '@ebryn/jsonapi-ts';
import Knex from 'knex';
import Koa from 'koa';
import knexConfigs from '../knexfile';

import types from './resources';

const knexConfig = knexConfigs[process.env.NODE_ENV || 'development'];

export const app = new Application({
  defaultProcessor: KnexProcessor,
  namespace: 'api',
  processors: [],
  types,
});

app.services.knex = Knex(knexConfig);

const koa = new Koa();

koa.use(jsonApiKoa(app));

export default koa;
