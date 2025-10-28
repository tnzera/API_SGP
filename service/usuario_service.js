const usuarioRepository = require('../repository/usuario_repository');

async function inserir(usuario) {
    // Validação de campos
    if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
        throw { id: 400, msg: "Dados do usuário incompletos (nome, email, senha)" };
    }
    // Fazer depois: validação de email já existente
    return await usuarioRepository.inserir(usuario);
}

async function listar() {
    return await usuarioRepository.listar();
}

async function buscarPorId(id) {
    const usuario = await usuarioRepository.buscarPorId(id);
    // Tratamento de exceção
    if (!usuario) {
        throw { id: 404, msg: "Usuário não encontrado" };
    }
    return usuario;
}

async function atualizarSaldo(id, novoSaldo) {
    return await usuarioRepository.atualizarSaldo(id, novoSaldo);
}

module.exports = {
    inserir,
    listar,
    buscarPorId,
    atualizarSaldo
}