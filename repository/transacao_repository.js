let listaTransacoes = [];
let autoIncrement = 1;

function inserir(transacao) {
    transacao.id = autoIncrement++;
    listaTransacoes.push(transacao);
    return Promise.resolve(transacao);
}

function listarPorUsuario(usuarioId) {
    return Promise.resolve(
        listaTransacoes.filter(t => t.usuarioId === usuarioId)
    );
}

module.exports = {
    inserir,
    listarPorUsuario
}