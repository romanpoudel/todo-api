import { Knex } from 'knex';

const TABLE_NAME = 'todos';

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
        { title: 'Task 1', completed: false, created_by: 1 },
        { title: 'Task 2', completed: true, created_by: 2 },
        { title: 'Task 3', completed: false, created_by: 1 },
        { title: 'Task 4', completed: true, created_by: 2 },
        { title: 'Task 5', completed: false, created_by: 1 },
      ]);
    });
}