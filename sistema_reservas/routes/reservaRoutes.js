const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservasController');
const validarCampos = require('../middlewares/validarCampos'); // Middleware para validação de campos
const autenticar = require('../middlewares/authMiddleware'); // Middleware de autenticação

// Endpoints
router.post(
    '/',
    autenticar,
    validarCampos(['mesa_id', 'data_reserva']),
    reservaController.criarReserva
);
router.get('/', autenticar, reservaController.listarReservas);
router.patch('/:id/cancelar', autenticar, reservaController.cancelarReserva);

module.exports = router;