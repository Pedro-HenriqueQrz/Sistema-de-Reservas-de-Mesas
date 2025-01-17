const validarCampos = (camposObrigatorios) => (req, res, next) => {
    const erros = [];
  
    camposObrigatorios.forEach((campo) => {
      if (!req.body[campo]) {
        erros.push(`O campo '${campo}' é obrigatório.`);
      }
    });

    if (erros.length > 0) {
        return res.status(400).json({ mensagem: 'Erro de validação', erros });
    }

    next();
}

module.exports = validarCampos;