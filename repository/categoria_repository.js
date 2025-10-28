let listaCategorias = [];
let autoIncrement = 1;

function inserir(categoria) {
    categoria.id = autoIncrement++;
    listaCategorias.push(categoria);
    return Promise.resolve(categoria);
}

function buscarPorId(id) {
    return Promise.resolve(listaCategorias.find(c => c.id === id));
}

//listar categorias de um usuário
function listarPorUsuario(usuarioId) {
    return Promise.resolve(
        listaCategorias.filter(c => c.usuarioId === usuarioId)
    );
}

module.exports = {
    inserir,
    buscarPorId,
    listarPorUsuario
}