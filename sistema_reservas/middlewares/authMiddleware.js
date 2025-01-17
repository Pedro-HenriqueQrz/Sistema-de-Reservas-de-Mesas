const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticar = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido!' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido!' });
    }
};

module.exports = autenticar;