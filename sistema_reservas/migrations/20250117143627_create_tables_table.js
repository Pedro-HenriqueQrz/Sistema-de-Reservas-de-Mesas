exports.up = function(knex) {
    return knex.schema.createTable('mesas', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.integer('capacidade').notNullable();
      table.enu('status', ['disponivel', 'reservada', 'inativa']).defaultTo('disponivel');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('mesas');
  };
  