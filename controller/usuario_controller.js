const usuarioService = require('../service/usuario_service');

async function inserir(req, res) {
    try {
        const usuarioInserido = await usuarioService.inserir(req.body);
        res.status(201).json(usuarioInserido); 
    } catch (err) {
        res.status(err.id || 500).json(err); 
    }
}

async function listar(req, res) {
    try {
        const lista = await usuarioService.listar();
        res.json(lista);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const usuario = await usuarioService.buscarPorId(id);
        res.json(usuario);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
}

module.exports = {
    inserir,
    listar,
    buscarPorId
}