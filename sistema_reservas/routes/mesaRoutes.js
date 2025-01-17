const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');
const autenticar = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/adminMiddleware');
const validarCampos = require('../middlewares/validarCampos');
// Endpoints

router.get('/', autenticar, mesaController.listarMesas);
router.post('/', autenticar, verificarAdmin, mesaController.criarMesa);
router.patch('/:id', autenticar, verificarAdmin, mesaController.atualizarMesa);
router.delete('/:id', autenticar, verificarAdmin, mesaController.removerMesa);

module.exports = router;