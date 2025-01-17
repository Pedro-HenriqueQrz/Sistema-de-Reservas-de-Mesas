exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable(); // Corrigido para 'password'
        table.string('role').defaultTo('cliente');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};