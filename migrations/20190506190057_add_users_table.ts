import Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
  await knex.raw('create extension if not exists "uuid-ossp";');
  await knex.schema.createTable('users', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('username');
    table.string('email');
    table.string('password');
    table.timestamps();
  });
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('users');
}

