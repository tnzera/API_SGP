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

async function atualizar(id, categoriaUpdate) {
    // Validação de campos
    if (!categoriaUpdate || !categoriaUpdate.nome || !categoriaUpdate.usuarioId) {
        throw { id: 400, msg: "Dados da categoria incompletos (nome, usuarioId)" };
    }
    
    // Verifica categoria existe
    const categoriaAntiga = await categoriaRepository.buscarPorId(id);
    if (!categoriaAntiga) {
        throw { id: 404, msg: "Categoria não encontrada" };
    }
    
    //Validação de segurança
    if (categoriaAntiga.usuarioId !== categoriaUpdate.usuarioId) {
        throw { id: 403, msg: "Operação proibida. Você não é o dono desta categoria." };
    }
    
    return await categoriaRepository.atualizar(id, categoriaUpdate);
}

async function deletar(id, usuarioId) {
    // Validação de entrada
    if (!id || !usuarioId) {
        throw { id: 400, msg: "Dados incompletos (id, usuarioId)" };
    }
    
    // Verifica categoria 
    const categoria = await categoriaRepository.buscarPorId(id);
    if (!categoria) {
        throw { id: 404, msg: "Categoria não encontrada" };
    }
    
    //Validação de segurança 
    if (categoria.usuarioId !== usuarioId) {
        throw { id: 403, msg: "Operação proibida. Você não é o dono desta categoria." };
    }

    const categoriaDeletada = await categoriaRepository.deletar(id);
    if (!categoriaDeletada) {
         throw { id: 404, msg: "Categoria não encontrada" }; // Segurança extra
    }
    return categoriaDeletada;
}

module.exports = {
    inserir,
    listarPorUsuario,
    deletar,
    atualizar
}