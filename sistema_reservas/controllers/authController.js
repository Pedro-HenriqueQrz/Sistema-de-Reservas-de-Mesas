const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../db/knex');

require('dotenv').config();

const registrar = async (req, res) => {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos!' });
    }

    try {
        // Verificação de email existente
        const usuarioExistente = await knex('users').where({ email }).first();
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'Email já cadastrado!' });
        }

        // Hash da senha
        const hashedSenha = await bcrypt.hash(senha, 10);

        // Inserção do usuário
        const [id] = await knex('users').insert({ nome, email, password: hashedSenha, role });

        return res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor!', error });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos!' });
    }

    try {
        // Verifica se o usuário existe
        const usuario = await knex('users').where({ email }).first();

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Email ou senha incorretos!' });
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(senha, usuario.password);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha incorretos!' });
        }

        // Gera o token
        const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ mensagem: 'Login realizado com sucesso!', token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor!', error });
    }
};

module.exports = { registrar, login };