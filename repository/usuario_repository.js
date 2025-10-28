let listaUsuarios = [];
let autoIncrement = 1;

//Saldo inicia em 0 e não pode ser alterado 
function inserir(usuario) {
    usuario.id = autoIncrement++;
    usuario.saldo = 0; 
    listaUsuarios.push(usuario);
    return Promise.resolve(usuario);
}

function listar() {
    return Promise.resolve(listaUsuarios);
}

function buscarPorId(id) {
    return Promise.resolve(listaUsuarios.find(u => u.id === id));
}

function atualizarSaldo(id, novoSaldo) {
    const usuario = listaUsuarios.find(u => u.id === id);
    if (usuario) {
        usuario.saldo = novoSaldo;
        return Promise.resolve(usuario);
    }
    return Promise.resolve(undefined);
}

module.exports = {
    inserir,
    listar,
    buscarPorId,
    atualizarSaldo
}