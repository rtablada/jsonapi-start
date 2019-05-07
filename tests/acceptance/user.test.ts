import faker = require('faker');
import { SuperTest, Test } from 'supertest';
import agent from 'supertest-koa-agent';
import http, { app } from '../../src/app';
import factory from '../factories/user';
import context from '../transaction';

const request = agent(http) as SuperTest<Test>;

describe(`Users`, () => {
  describe('GET', () => {
    it('Show users index', async () => {
      const factoryData = factory.buildList(faker.random.number({min: 3, max: 10 }))
      const dbResources = await context.transaction.table('users')
        .insert(factoryData, '*');

      const result = await request.get(`/users`);

      expect(result.status).toEqual(200);
      expect(result.body.data.length).toEqual(dbResources.length);

      dbResources.forEach((dbRecord) => {
        const requestResult = result.body.data.find(a => a.id === dbRecord.id);

        expect(requestResult).not.toBeUndefined();
        expect(requestResult.attributes.email).toEqual(dbRecord.email);
        expect(requestResult.attributes.username).toEqual(dbRecord.username);
      })
    });

    it('Gets user by id', async () => {
      const factoryData = factory.buildList(faker.random.number({min: 3, max: 10 }))
      const dbResources = await context.transaction.table('users')
        .insert(factoryData, '*');
      const dbRecord : any = faker.random.arrayElement(dbResources);

      const result = await request.get(`/users/${dbRecord.id}`);

      expect(result.status).toEqual(200);
      const [requestResult] = result.body.data;
      expect(requestResult).not.toBeUndefined();
      expect(requestResult.attributes.email).toEqual(dbRecord.email);
      expect(requestResult.attributes.username).toEqual(dbRecord.username);
    });
  });
});
