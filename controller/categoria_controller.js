const categoriaService = require('../service/categoria_service');

async function inserir(req, res) {
    try {
        // { "nome": "Salário", "usuarioId": 1 } no body
        const categoriaInserida = await categoriaService.inserir(req.body);
        res.status(201).json(categoriaInserida);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
}

async function listarPorUsuario(req, res) {
    ///api/categorias?usuarioId=1
    const usuarioId = +req.query.usuarioId; 
    
    try {
        const lista = await categoriaService.listarPorUsuario(usuarioId);
        res.json(lista);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
}

module.exports = {
    inserir,
    listarPorUsuario
}