exports.up = function(knex) {
    return knex.schema.createTable('study_sessions', table => {
      table.increments('id').primary();
      table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.string('session_type').notNullable();
      table.integer('duration_minutes').notNullable();
      table.integer('actual_duration_seconds').nullable();
      table.boolean('completed').defaultTo(false);
      table.text('notes').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('study_sessions');
  };