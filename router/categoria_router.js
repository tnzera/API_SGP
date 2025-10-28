const express = require('express');
const router = express.Router();
const categoriaController = require('../controller/categoria_controller');

// /api/categorias
router.post('/', categoriaController.inserir);
router.get('/', categoriaController.listarPorUsuario);

module.exports = router;