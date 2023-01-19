/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {id: 1, user_id: 1, name: 'Category 1'},
    {id: 2, user_id: 1, name: 'Category 2'},
    {id: 3, user_id: 1, name: 'Category 3'},
    {id: 4, user_id: 2, name: 'Category 1'},
    {id: 5, user_id: 2, name: 'Category 2'},
    {id: 6, user_id: 2, name: 'Category 3'}  
  ]);
};
