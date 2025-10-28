const transacaoService = require('../service/transacao_service');

async function inserir(req, res) {
    try {
        // { "usuarioId": 1, "categoriaId": 1, "valor": 1500, "tipo": "receita" }
        const transacaoInserida = await transacaoService.inserir(req.body);
        res.status(201).json(transacaoInserida);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
}

async function listarPorUsuario(req, res) {
    //api/transacoes?usuarioId=1
    const usuarioId = +req.params.idUsuario; 
    
    try {
        const lista = await transacaoService.listarPorUsuario(usuarioId);
        res.json(lista);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
}

module.exports = {
    inserir,
    listarPorUsuario
}