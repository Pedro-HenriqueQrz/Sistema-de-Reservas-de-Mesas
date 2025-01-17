const knex = require('../db/knex');
const moment = require('moment');
const logger = require('../utils/logger');
const reservaService = require('../services/reservaService');


const criarReserva = async (req, res) => {
  const { mesa_id, data_reserva } = req.body;
  const usuario_id = req.user.id;

  try {
    const id = await reservaService.criarReserva(usuario_id, mesa_id, data_reserva);
    logger.info(`Reserva criada pelo usuário ${usuario_id}`, { usuario_id, mesa_id, data_reserva });

    return res.status(201).json({ message: 'Reserva criada com sucesso.', id });
  } catch (error) {
    logger.error(`Erro ao criar reserva: ${error.message}`);
    return res.status(400).json({ message: error.message });
  }
};


const listarReservas = async (req, res) => {
    const usuario_id = req.user.id;

    try {
        const reservas = await knex('reservas')
            .where({ usuario_id })
            .join('mesas', 'reservas.mesa_id', 'mesas.id')
            .select('reservas.*', 'mesas.nome as mesa_nome', 'mesas.capacidade');

        return res.status(200).json(reservas);
    } catch (error) {
        console.error('Erro ao listar reservas:', error);
        return res.status(500).json({ mensagem: 'Erro no servidor!', error });
    }
};

const cancelarReserva = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.user.id;

    try {
        const reserva = await knex('reservas').where({ id, usuario_id }).first();

        if (!reserva) {
            return res.status(404).json({ mensagem: 'Reserva não encontrada!' });
        }

        if (reserva.status === 'cancelado') {
            return res.status(400).json({ mensagem: 'A reserva já está cancelada' });
        }

        // Atualizar status da reserva para 'cancelado'
        await knex('reservas').where({ id }).update({ status: 'cancelado' });

        // Atualizar status da mesa para 'disponivel'
        await knex('mesas').where({ id: reserva.mesa_id }).update({ status: 'disponivel' });

        return res.status(200).json({ mensagem: 'Reserva cancelada com sucesso!' });
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
        return res.status(500).json({ mensagem: 'Erro no servidor!', error });
    }
};

module.exports = { criarReserva, listarReservas, cancelarReserva };