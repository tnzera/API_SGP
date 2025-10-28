const express = require('express');
const router = express.Router();
const categoriaController = require('../controller/categoria_controller');

// /api/categorias
router.post('/', categoriaController.inserir);
router.get('/listarPorUsuario/:idUsuario', categoriaController.listarPorUsuario);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.deletar);

module.exports = router;