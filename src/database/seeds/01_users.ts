import { Knex } from 'knex';

const TABLE_NAME = 'users';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          email: 'user1@gmail.com',
          username: 'user1',
          password:'User1@12'
        },
        {
          email: 'user2@gmail.com',
          username: 'user2',
          password:'User2@12'
        }
      ]);
    });
}