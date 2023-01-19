/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {id: 1, user_id: 1, category_id: 1, name: 'task 1', description: 'My task 1', done: false},
    {id: 2, user_id: 1, category_id: 1, name: 'task 2', description: 'My task 2', done: false},
    {id: 3, user_id: 1, category_id: 2, name: 'task 3', description: 'My task 3', done: true},
    {id: 4, user_id: 2, category_id: 4, name: 'task 4', description: 'My task 4', done: false}
  ]);
};
