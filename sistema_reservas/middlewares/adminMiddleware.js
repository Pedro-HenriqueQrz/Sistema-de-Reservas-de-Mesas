const verificarAdmin = (req, res, next) => {
    if (req.user.role !== 'administrador') {
        return res.status(401).json({ mensagem: 'Acesso não autorizado!' });
    }
    next();
};

module.exports = verificarAdmin;