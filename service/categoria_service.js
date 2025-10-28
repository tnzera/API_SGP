const categoriaRepository = require('../repository/categoria_repository');
const usuarioRepository = require('../repository/usuario_repository'); 

async function inserir(categoria) {
    // Validação de campos
    if (!categoria || !categoria.nome || !categoria.usuarioId) {
        throw { id: 400, msg: "Dados da categoria incompletos (nome, usuarioId)" };
    }

    // Validação de entidade 
    const usuario = await usuarioRepository.buscarPorId(categoria.usuarioId);
    if (!usuario) {
        throw { id: 404, msg: "Usuário vinculado não encontrado" };
    }

    return await categoriaRepository.inserir(categoria);
}

async function listarPorUsuario(usuarioId) {
    if (!usuarioId) {
        throw { id: 400, msg: "É obrigatório informar o usuarioId" };
    }
    return await categoriaRepository.listarPorUsuario(usuarioId);
}

module.exports = {
    inserir,
    listarPorUsuario
}