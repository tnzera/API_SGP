const transacaoRepository = require('../repository/transacao_repository');
const usuarioRepository = require('../repository/usuario_repository'); 
const categoriaRepository = require('../repository/categoria_repository');


async function inserir(transacao) {
    // Validação de campos
    if (!transacao || !transacao.usuarioId || !transacao.valor || !transacao.tipo || !transacao.categoriaId) {
        throw { id: 400, msg: "Dados da transação incompletos (usuarioId, valor, tipo, categoriaId)" };
    }
    
    // RN: Não é permitido registrar uma transação com valor negativo.
    if (transacao.valor <= 0) {
        throw { id: 400, msg: "Valor da transação deve ser positivo" };
    }
    
    // Validação de tipo
    if (transacao.tipo !== 'receita' && transacao.tipo !== 'despesa') {
        throw { id: 400, msg: "Tipo da transação deve ser 'receita' ou 'despesa'" };
    }

    // Validação de entidades (exceções)
    const usuario = await usuarioRepository.buscarPorId(transacao.usuarioId);
    if (!usuario) {
        throw { id: 404, msg: "Usuário da transação não encontrado" };
    }
    
    const categoria = await categoriaRepository.buscarPorId(transacao.categoriaId);
    if (!categoria) {
        throw { id: 404, msg: "Categoria da transação não encontrada" };
    }
    
    // Validação de segurança: A categoria pertence ao usuário?
    if (categoria.usuarioId !== usuario.id) {
        throw { id: 403, msg: "Operação proibida. A categoria não pertence a este usuário." }; // 403 Forbidden
    }
    
    // Adiciona data se não existir
    transacao.data = transacao.data ? new Date(transacao.data) : new Date();

    // Inserção no repositório
    const transacaoInserida = await transacaoRepository.inserir(transacao);
    
    // RN: Cálculo automático do saldo (manipulando a entidade Usuário)
    let novoSaldo = usuario.saldo;
    if (transacao.tipo === 'receita') {
        novoSaldo += transacao.valor;
    } else { // 'despesa'
        novoSaldo -= transacao.valor;
    }
    
    
    // Atualiza o saldo diretamente no repositório do usuário
    await usuarioRepository.atualizarSaldo(usuario.id, novoSaldo);
    
    return transacaoInserida;
}

async function listarPorUsuario(usuarioId) {
    if (!usuarioId) {
        throw { id: 400, msg: "É obrigatório informar o usuarioId" };
    }
    return await transacaoRepository.listarPorUsuario(usuarioId);
}

module.exports = {
    inserir,
    listarPorUsuario
}