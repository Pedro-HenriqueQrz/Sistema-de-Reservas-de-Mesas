const knex = require('../db/knex');

const verificarDisponibilidadeMesa = async (mesa_id, data_reserva) => {
    const reservas = await knex('reservas')
        .where({ mesa_id, data_reserva })
        .andWhere('status', 'ativo');

    return reservas.length === 0;
};

const criarReserva = async (usuario_id, mesa_id, data_reserva) => {
    const [id] = await knex('reservas').insert({
        usuario_id,
        mesa_id,
        data_reserva,
        status: 'ativo',
    });

    await knex('mesas').where({ id: mesa_id }).update({ status: 'reservada' });

    return id;
};

module.exports = {
    verificarDisponibilidadeMesa,
    criarReserva,
};