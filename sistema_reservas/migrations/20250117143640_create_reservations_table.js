
exports.up = function(knex) {
    return knex.schema.createTable('reservas', (table) => {
        table.increments('id').primary();
        table.integer('usuario_id').unsigned().notNullable();
        table.foreign('usuario_id').references('id').inTable('users').onDelete('CASCADE');
        table.integer('mesa_id').unsigned().notNullable();
        table.foreign('mesa_id').references('id').inTable('mesas').onDelete('CASCADE');
        table.datetime('data_reserva').notNullable();
        table.enu('status', ['ativo', 'cancelado']).defaultTo('ativo');
        table.timestamp(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reservas');
};
