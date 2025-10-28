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

//listar categorias
function listarPorUsuario(usuarioId) {
    return Promise.resolve(
        listaCategorias.filter(c => c.usuarioId === usuarioId)
    );
}

function atualizar(id, categoriaAtual) {
    const indice = listaCategorias.findIndex(c => c.id === id);
    if (indice === -1) {
        return Promise.resolve(undefined); // Não encontrado
    }
    categoriaAtual.id = id;
    categoriaAtual.usuarioId = listaCategorias[indice].usuarioId; 
    
    listaCategorias[indice] = categoriaAtual;
    return Promise.resolve(listaCategorias[indice]);
}

function deletar(id) {
    const indice = listaCategorias.findIndex(c => c.id === id);
    if (indice === -1) {
        return Promise.resolve(undefined); // Não encontrado
    }
    const categoriaRemovida = listaCategorias.splice(indice, 1)[0];
    return Promise.resolve(categoriaRemovida);
}

module.exports = {
    inserir,
    buscarPorId,
    listarPorUsuario,
    atualizar, 
    deletar
}