const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Corrigir os nomes das funções para 'registrar' e 'login'
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

module.exports = router;