/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.integer('user_id').notNullable()
        table.string('name', 80).notNullable()
        table.foreign('user_id').references('users.id')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('categories')
}
