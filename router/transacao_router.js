const express = require('express');
const router = express.Router();
const transacaoController = require('../controller/transacao_controller');

// /api/transacoes
router.post('/', transacaoController.inserir);
router.get('/', transacaoController.listarPorUsuario); 

module.exports = router;