import { Transaction } from 'knex';
import knexMigrate from 'knex-migrate';
import { app } from '../src/app';
import context from './transaction';

const knex = app.services.knex;

const createTransaction = () : Promise<Transaction> => {
  return new Promise(resolve => knex.transaction((t) => {
    app.services.knex = t;
    return resolve(t);
  }).catch((e) => {
  }));
}

beforeAll(async () => {
  await knexMigrate('redo');
});

beforeEach(async () => {
  context.transaction = await createTransaction();
});

afterEach(async () => {
  await context.transaction.rollback();
});
