import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary()

    table.integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('cascade')

    table.timestamps(true, true)
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('connections')
}
