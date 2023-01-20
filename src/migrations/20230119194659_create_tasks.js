/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary()
        table.string('name', 80).notNullable()
        table.string('description', 1000).notNullable()
        table.boolean('done').defaultTo(false)
        table.integer('category_id')
        table.integer('user_id')
        table.foreign('category_id').references('id').inTable('categories')
        table.foreign('user_id').references('id').inTable('users')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tasks')  
}
