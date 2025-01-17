const knex = require('../db/knex');

const listarMesas = async (req, res) => {
    try {
        const mesas = await knex('mesas').select('*');
        return res.status(200).json(mesas);
    } catch (error) {
        console.error('Erro ao listar mesas:', error);
        return res.status(500).json({ mensagem: 'Erro no servidor!' });
    }
};

const criarMesa = async (req, res) => {
    const { nome, capacidade } = req.body;

    if (!nome || !capacidade) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos!' });
    }

    try {
        const [id] = await knex('mesas').insert({ nome, capacidade });
        return res.status(201).json({ mensagem: 'Mesa criada com sucesso!', id });
    } catch (error) {
        console.error('Erro ao criar mesa:', error);
        return res.status(500).json({ mensagem: 'Erro no servidor!', error });
    }
};

const atualizarMesa = async (req, res) => {
    const { id } = req.params;
    const { nome, capacidade, status } = req.body;

    try {
        const mesa = await knex('mesas').where({ id }).first();
        if (!mesa) {
            return res.status(404).json({ mensagem: 'Mesa não encontrada!' });
        }

        await knex('mesas').where({ id }).update({ nome, capacidade, status });
        return res.status(200).json({ mensagem: 'Mesa atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar mesa:', error);
        return res.status(500).json({ mensagem: 'Erro no servidor!', error });
    }
};

const removerMesa = async (req, res) => {
    const { id } = req.params;

    try {
        const mesa = await knex('mesas').where({ id }).first();
        if (!mesa) {
            return res.status(404).json({ mensagem: 'Mesa não encontrada!' });
        }

        await knex('mesas').where({ id }).del();
        return res.status(200).json({ mensagem: 'Mesa deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao remover mesa:', error);
        return res.status(500).json({ mensagem: 'Erro no servidor!', error });
    }
};

module.exports = { listarMesas, criarMesa, atualizarMesa, removerMesa };