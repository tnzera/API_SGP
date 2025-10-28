const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario_controller');

// /api/usuarios
router.post('/', usuarioController.inserir);
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);

module.exports = router;